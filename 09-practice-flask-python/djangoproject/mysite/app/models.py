from logging.config import valid_ident
from os import name
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class productTea(models.Model):
    PRODUCT_TYPE_CHOICES = [
        ('green', 'Green Tea'),
        ('black', 'Black Tea'),
        ('herbal', 'Herbal Tea'),
        ('chai', 'Chai Tea'),
        ('oolong', 'Oolong Tea'),
        ('white', 'White Tea'),
        ('puerh', 'Puerh Tea'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teas', default=1)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.CharField(max_length=8, choices=PRODUCT_TYPE_CHOICES)

    def __str__(self):
        return f"{self.user.username} {self.name}"

# one to many relationship
class ProductReviews(models.Model):
    product = models.ForeignKey(productTea, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    date_added = models.DateTimeField(default=timezone.now)
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.review} by {self.user.username} on {self.product.name}'

# many to many relationship
class Store(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    product_tea = models.ManyToManyField(productTea, related_name='stores')
    tag = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'
    

# one to one relationship
class ProductCertificate(models.Model):
    product = models.OneToOneField(productTea, on_delete=models.CASCADE, related_name='certification')
    certificate_number = models.CharField(max_length=100)
    issued_date = models.DateField(default=timezone.now)
    valid_until = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'certificate for {self.product.name}'

