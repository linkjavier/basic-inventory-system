CREATE OR REPLACE FUNCTION record_sale(v_product_id INT, v_warehouse_id INT, v_quantity_sold INT)
RETURNS VOID AS $$
BEGIN
    -- Verificar si el inventario existe para el producto y almacén especificados
    IF NOT EXISTS (
        SELECT 1 
        FROM inventory 
        WHERE product_id = v_product_id AND warehouse_id = v_warehouse_id
    ) THEN
        RAISE EXCEPTION 'Inventory record does not exist for product_id % and warehouse_id %', v_product_id, v_warehouse_id;
    END IF;

    -- Verificar si hay suficiente inventario
    IF (SELECT quantity FROM inventory WHERE product_id = v_product_id AND warehouse_id = v_warehouse_id) < v_quantity_sold THEN
        RAISE EXCEPTION 'Not enough inventory for product_id % and warehouse_id %', v_product_id, v_warehouse_id;
    END IF;

    -- Registrar la venta
    INSERT INTO sale (product_id, warehouse_id, quantity_sold, sale_date)
    VALUES (v_product_id, v_warehouse_id, v_quantity_sold, NOW());

    -- Actualizar el inventario
    UPDATE inventory
    SET quantity = quantity - v_quantity_sold
    WHERE product_id = v_product_id AND warehouse_id = v_warehouse_id;
END;
$$ LANGUAGE plpgsql;
