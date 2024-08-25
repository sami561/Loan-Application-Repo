FROM python
WORKDIR /wideApi
COPY   requirements.txt /wideApi
RUN pip install -r requirements.txt --no-cache-dir
COPY . /wideApi 
CMD ["python3","manage.py", "runserver", "0.0.0.0:8000"]
