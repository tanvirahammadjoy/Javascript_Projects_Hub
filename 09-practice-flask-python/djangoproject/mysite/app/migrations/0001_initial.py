# Generated by Django 5.1.6 on 2025-02-14 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='productTea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('image', models.ImageField(upload_to='products/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('type', models.CharField(choices=[('green', 'Green Tea'), ('black', 'Black Tea'), ('herbal', 'Herbal Tea'), ('chai', 'Chai Tea'), ('oolong', 'Oolong Tea'), ('white', 'White Tea'), ('puerh', 'Puerh Tea')], max_length=8)),
            ],
        ),
    ]
