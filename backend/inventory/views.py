from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Product, Warehouse, Inventory, Sale
from .serializers import ProductSerializer, WarehouseSerializer, InventorySerializer, SaleSerializer
from django.db import connection

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        warehouse_id = request.data.get('warehouse')
        quantity = request.data.get('quantity')

        # Print the values to the console
        print(f"Request Data: {request.data}")
        print(f"Product ID: {product_id}")
        print(f"Warehouse ID: {warehouse_id}")
        print(f"Quantity: {quantity}")

        try:
            with connection.cursor() as cursor:
                cursor.callproc('update_inventory', [product_id, warehouse_id, quantity])
            return Response({"detail": "Inventory updated successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        warehouse_id = request.data.get('warehouse')
        quantity = request.data.get('quantity')

        # Print the values to the console
        print(f"Request Data: {request.data}")
        print(f"Product ID: {product_id}")
        print(f"Warehouse ID: {warehouse_id}")
        print(f"Quantity: {quantity}")

        try:
            with connection.cursor() as cursor:
                cursor.callproc('update_inventory', [product_id, warehouse_id, quantity])
            return Response({"detail": "Inventory updated successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        warehouse_id = request.data.get('warehouse')
        quantity_sold = request.data.get('quantity_sold')

        # Print the values to the console
        print(f"Request Data: {request.data}")
        print(f"Product ID: {product_id}")
        print(f"Warehouse ID: {warehouse_id}")
        print(f"Quantity Sold: {quantity_sold}")

        try:
            with connection.cursor() as cursor:
                cursor.callproc('record_sale', [product_id, warehouse_id, quantity_sold])
            return Response({"detail": "Sale recorded successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
