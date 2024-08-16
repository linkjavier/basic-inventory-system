CREATE OR REPLACE FUNCTION record_sale(product_id INT, warehouse_id INT, quantity_sold INT)
RETURNS VOID AS $$
BEGIN
    -- Verificar si hay suficiente inventario
    IF (SELECT quantity FROM inventory WHERE product_id = product_id AND warehouse_id = warehouse_id) < quantity_sold THEN
        RAISE EXCEPTION 'Not enough inventory';
    END IF;

    -- Registrar la venta
    INSERT INTO sales (product_id, warehouse_id, quantity_sold)
    VALUES (product_id, warehouse_id, quantity_sold);

    -- Actualizar el inventario
    UPDATE inventory
    SET quantity = quantity - quantity_sold
    WHERE product_id = product_id AND warehouse_id = warehouse_id;
END;
$$ LANGUAGE plpgsql;
