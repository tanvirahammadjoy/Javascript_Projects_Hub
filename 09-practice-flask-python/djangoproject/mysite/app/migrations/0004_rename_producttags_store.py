# Generated by Django 5.1.6 on 2025-02-15 04:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_rename_productinventory_productcertificate'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='productTags',
            new_name='Store',
        ),
    ]
