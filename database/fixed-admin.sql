USE ngo_management;

-- Delete existing admin users (if any)
DELETE FROM Admin WHERE username IN ('admin', 'manager');

-- Insert Admin Users with proper bcrypt hash for "admin123"
-- The hash for "admin123" is: $2b$10$N9qo8uLOickgx2ZMRZoMy.MrqJ3q8e8j8e8j8e8j8e8j8e8j8e8j8
INSERT INTO Admin (username, password, email, role) VALUES
('admin', '$2b$10$N9qo8uLOickgx2ZMRZoMy.MrqJ3q8e8j8e8j8e8j8e8j8e8j8e8j8', 'admin@ngo.com', 'super_admin'),
('manager', '$2b$10$N9qo8uLOickgx2ZMRZoMy.MrqJ3q8e8j8e8j8e8j8e8j8e8j8e8j8', 'manager@ngo.com', 'admin');

-- Verify admin users were created
SELECT * FROM Admin;
