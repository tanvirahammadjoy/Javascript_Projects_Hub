from django import forms
from .models import productTea

class productTeaForm(forms.Form):
    tea_variety = forms.ModelChoiceField(queryset=productTea.objects.all(), label='Select Tea Variety')
