CREATE OR REPLACE FUNCTION record_sale(v_product_id INT, v_warehouse_id INT, v_quantity_sold INT)
RETURNS VOID AS $$
BEGIN
    -- Verificar si hay suficiente inventario
    IF (SELECT quantity FROM inventory WHERE product_id = v_product_id AND warehouse_id = v_warehouse_id) < v_quantity_sold THEN
        RAISE EXCEPTION 'Not enough inventory';
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
