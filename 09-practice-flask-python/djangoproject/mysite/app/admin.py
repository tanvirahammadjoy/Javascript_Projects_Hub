from django.contrib import admin
from .models import productTea, ProductReviews, Store, ProductCertificate

# Register your models here.

class ProductReviewsInline(admin.TabularInline):
    model = ProductReviews
    extra = 2

class ProductTeaAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'type', 'created_at', 'updated_at')
    inlines = [ProductReviewsInline]

class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'tag', 'created_at', 'updated_at')
    filter_horizontal = ('product_tea',)

class ProductCertificateAdmin(admin.ModelAdmin):
    list_display = ('product', 'certificate_number', 'issued_date', 'valid_until', 'created_at', 'updated_at')

admin.site.register(productTea, ProductTeaAdmin)
admin.site.register(Store, StoreAdmin)
admin.site.register(ProductCertificate, ProductCertificateAdmin)

