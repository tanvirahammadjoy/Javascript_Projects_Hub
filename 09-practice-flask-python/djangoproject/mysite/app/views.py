from django.shortcuts import render
from .models import productTea
from django.shortcuts import get_object_or_404

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
    return render(request, 'app/app_stores.html')

