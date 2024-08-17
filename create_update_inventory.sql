CREATE OR REPLACE FUNCTION update_inventory(v_product_id INT, v_warehouse_id INT, v_quantity INT)
RETURNS VOID AS $$
BEGIN
    -- Verificar si el inventario ya existe
    IF EXISTS (
        SELECT 1
        FROM inventory
        WHERE product_id = v_product_id AND warehouse_id = v_warehouse_id
    ) THEN
        -- Si el inventario ya existe, actualizar la cantidad
        UPDATE inventory
        SET quantity = quantity + v_quantity
        WHERE product_id = v_product_id AND warehouse_id = v_warehouse_id;
    ELSE
        -- Si el inventario no existe, insertarlo
        INSERT INTO inventory (product_id, warehouse_id, quantity)
        VALUES (v_product_id, v_warehouse_id, v_quantity);
    END IF;
END;
$$ LANGUAGE plpgsql;
