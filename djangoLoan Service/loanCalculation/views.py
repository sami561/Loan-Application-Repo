import numpy_financial as npf
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def calculate_loan_amount(request):
    if request.method == 'POST':
        # Extract data from request
        # int_rate = float(request.POST.get('int_rate'))
        # years = int(request.POST.get('years'))
        # pmts_year = 12
        # monthly_pmt = float(request.POST.get('monthly_pmt'))

        int_rate = 0.074
        maxTenor = int(request.data['years'])
        age=int(request.data['age'])
        pmts_year = 12
        monthly_pmt = float(request.data['monthly_pmt'])
        Deposit=float(request.data['Deposit'])

         #max monthly  payment 
        max_monthly_pmt = monthly_pmt * 0.50
        
        # Calculate loan amount
        loan_amount = npf.pv(int_rate/pmts_year, maxTenor*pmts_year, max_monthly_pmt * -1)
       # Calculate the monthly payment using Numpy-Financial Library
        payment = npf.pmt(int_rate/pmts_year, maxTenor * pmts_year , loan_amount)*-1
    
        pruch_rState=loan_amount+Deposit;
      

        data = {
            'loan_amount': '{0:,.2f}'.format(loan_amount),
            'pruch_rState':'{0:,.2f}'.format(pruch_rState),
            'monthly_payment': "{:,.2f}".format(payment),
        }
        
        # Return response as JSON
        return JsonResponse(data)
    else:
        data = {
            'message': 'error',
            'error_description': 'Invalid request method. Only POST is supported.'
        }
        return JsonResponse(data, status=405)


@api_view(['POST'])
def Payement_Loan_with_fixed_interest_rate(request):
    if request.method == 'POST':
        int_rate = 0.074
        maxTenor = int(request.data['maxTenor'])
        pmts_year = 12     
        downPayment  = float(request.data['downPayment'])
        propertyValue= float(request.data['propertyValue'])
        monthly_pmt = float(request.data['monthly_pmt'])
        amt_borrowed = propertyValue - downPayment
        if monthly_pmt < 15000 and monthly_pmt is not None:
            response_data = {
                "error": "Votre mensualité ne doit pas être inférieure à 15000"
            }
            return JsonResponse(response_data, status=400)

        # Check if monthly_pmt is None
        elif monthly_pmt is None:
            response_data = {
                "error": "Monthly payment value is missing."
            }
            return JsonResponse(response_data, status=400)
        elif (
            (downPayment <= 0.2 * propertyValue or downPayment >= propertyValue) and
            downPayment is not None and
            propertyValue is not None
        ):
            response_data = {
                "error": "Invalid down payment amount. Please enter a value greater than 20% of the property value and less than the property value."
            }
            return JsonResponse(response_data, status=400)
        # Calculate the monthly payment using Numpy-Financial Library
        payment = npf.pmt(int_rate/pmts_year, maxTenor * pmts_year , amt_borrowed)*-1

        # Amount of first payment that goes toward principal (the amount you # borrowed)
        principal_amount = npf.ppmt(int_rate/pmts_year, 1, maxTenor*pmts_year, amt_borrowed) * -1

        int_amount = npf.ipmt(int_rate/pmts_year, 1, maxTenor*pmts_year, amt_borrowed)*-1
        total_pmts = payment * maxTenor * pmts_year
        total_int = total_pmts - amt_borrowed
       # Perform the calculations
        land_department_fee = propertyValue * 0.04 + 580
        registration_fee = 0
        if propertyValue > 500000:
         registration_fee = 4000
        registration_fee += registration_fee * 0.05  # Adding 5% VAT
        mortgage_registration_fee = amt_borrowed * 0.0025 + 10
        real_estate_agency_fee = propertyValue * 0.02
        real_estate_agency_fee += real_estate_agency_fee * 0.05  # Adding 5% VAT

        valuation_fee = 2500
        if propertyValue > 3000000:
         valuation_fee = 3500
        valuation_fee += valuation_fee * 0.05  # Adding 5% VAT

        total_fees = (
        land_department_fee +
        registration_fee +
        mortgage_registration_fee +
        real_estate_agency_fee +
        valuation_fee
         )
        land_department_percentage = (land_department_fee / total_fees) * 100
        registration_percentage = (registration_fee / total_fees) * 100
        mortgage_registration_percentage = (mortgage_registration_fee / total_fees) * 100
        real_estate_agency_percentage = (real_estate_agency_fee / total_fees) * 100
        valuation_percentage = (valuation_fee / total_fees) * 100
        total_fees_percentage=(total_fees / total_fees) * 100
        response_data = {
        'monthly_payment': "{:,.2f}".format(payment),
        'principal_amount': "{:,.2f}".format(principal_amount),
        'interest_amount': "{:,.2f}".format(int_amount),
        'amt_borrowed': "{:,.2f}.".format(amt_borrowed),
        'total_int':"{:,.2f}.".format(total_int),
        'total_pmts':"{:,.2f}.".format(total_pmts),
        'landDepartmentFee':"{:,.2f}.".format(land_department_fee),
        'registration_fee':"{:,.2f}.".format(registration_fee),
        'mortgage_registration_fee':"{:,.2f}.".format(mortgage_registration_fee),
        'real_estate_agency_fee':"{:,.2f}.".format(real_estate_agency_fee),
        'valuation_fee':"{:,.2f}.".format(valuation_fee),
        'total_fees':"{:,.2f}.".format(total_fees),
        'land_department_percentage':"{:,.2f}.".format(land_department_percentage),
        'registration_percentage':"{:,.2f}.".format(registration_percentage),
        'mortgage_registration_percentage':"{:,.2f}.".format(mortgage_registration_percentage),
        'real_estate_agency_percentage':"{:,.2f}.".format(real_estate_agency_percentage),
        'valuation_percentage':"{:,.2f}.".format(valuation_percentage),
        'total_fees_percentage':"{:,.2f}.".format(total_fees_percentage),

    }
        return JsonResponse(response_data, status=200)
    else:
        data = {
            'message': 'error',
            'error_description': 'Invalid request method.',
        }
        return JsonResponse(data, status=405)
    

@api_view(['POST'])
def Payement_Loan_with_Variable_interest_rate(request):
    if request.method == 'POST':
        loan_amount = float(request.data['loan_amount'])
        interest_rates = [0.05, 0.0575, 0.06]
        loan_duration_years = int(request.data['loan_duration_years'])
        loan_duration_months = loan_duration_years * 12

        y1 = loan_duration_years * 0.25 # first year (25% de la durée du pret)
        y2 = y1 + loan_duration_years * 0.5  # second year 
        y3 = y1 + y2 # third year

        interest1 = interest_rates[0]
        interest2 = interest_rates[1]
        interest3 = interest_rates[2]

        monthly_payment = 0
        for year in range(loan_duration_years):
            if year < y1:
                rate = interest1/12
            elif year < y2:
                rate = interest2/12
            elif year < y3:
                rate = interest3/12
            else:
                rate = interest3/12

        monthly_payment = npf.pmt(rate, loan_duration_months, loan_amount)*-1

        response_data = {
        'monthly_payment': "${:,.2f}".format(monthly_payment)
    }
        return JsonResponse(response_data, status=200)
    else:
        data = {
            'message': 'error',
            'error_description': 'Invalid request method.',
        }
        return JsonResponse(data, status=405)
    

@api_view(['GET'])
def getHello(request):
    if request.method == 'GET':
        return JsonResponse({}, status=200)
    else: 
        return JsonResponse({}, status=405)