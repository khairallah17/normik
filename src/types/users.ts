/**
 * User Management Types
 * 
 * Defines interfaces and types for user management functionality
 * Based on the MyDMS users page structure
 */

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  employeeNumber?: string;
  status: 'active' | 'inactive';
  role?: string;
  department?: string;
  phone?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFilters {
  name?: string;
  username?: string;
  employeeNumber?: string;
  status?: 'active' | 'inactive';
  role?: string;
  department?: string;
}

export interface BulkAction {
  id: string;
  label: string;
  action: 'delete' | 'activate' | 'deactivate' | 'force_password_change' | 'require_2fa';
  destructive?: boolean;
}

export interface UserTableColumn {
  key: keyof User;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface UserFormData {
  name: string;
  username: string;
  email?: string;
  employeeNumber?: string;
  role?: string;
  department?: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export interface UserExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  includeInactive: boolean;
  fields: (keyof User)[];
}

export interface UserImportResult {
  success: number;
  errors: number;
  total: number;
  errorsList: Array<{
    row: number;
    field: string;
    message: string;
  }>;
}
