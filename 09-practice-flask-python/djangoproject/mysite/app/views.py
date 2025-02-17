from re import S
from django.shortcuts import render
from .models import productTea, Store
from django.shortcuts import get_object_or_404
from .forms import productTeaForm

# Create your views here.
def all_index(request):
    teas = productTea.objects.all()
    return render(request, 'app/all_index.html', {'teas': teas})
    # return render(request, 'app/all_index.html')
    
def detail(request, product_id):
    tea = get_object_or_404(productTea, pk=product_id)
    return render(request, 'app/detail.html', {'tea': tea})
    # return render(request, 'app/detail.html')

def app_stores_view(request):
    stores = None
    if request.method == 'POST':
        form = productTeaForm(request.POST)
        if form.is_valid():
            tea_variety = form.cleaned_data['tea_variety']
            stores = Store.objects.filter(product_tea=tea_variety)
    else:
        form = productTeaForm()
    return render(request, 'app/app_stores.html', {'stores': stores, 'form': form})

