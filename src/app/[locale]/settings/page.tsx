export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          System administration and configuration
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">User Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage users, groups, and permissions
          </p>
        </div>
        
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">System Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure system settings and preferences
          </p>
        </div>
        
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Logs & Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            View system logs and monitoring data
          </p>
        </div>
      </div>
    </div>
  )
}
