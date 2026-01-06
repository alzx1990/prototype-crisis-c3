import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Bell, 
  Shield, 
  Database,
  Radio,
  Map,
  Users,
  Palette,
  Volume2,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                System Settings
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Configure system preferences and operational parameters
              </p>
            </div>
            <Button variant="command" className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure alert and notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Critical Alerts</p>
                    <p className="text-sm text-muted-foreground">Audio and visual alerts for critical incidents</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">High Priority Notifications</p>
                    <p className="text-sm text-muted-foreground">Desktop notifications for high priority events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Status Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications for incident status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Team Assignments</p>
                    <p className="text-sm text-muted-foreground">Alerts when teams are assigned to incidents</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Audio Settings */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  Audio Settings
                </CardTitle>
                <CardDescription>Configure audio alerts and radio settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Alert Sounds</p>
                    <p className="text-sm text-muted-foreground">Play sounds for critical alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Radio Chatter</p>
                    <p className="text-sm text-muted-foreground">Background radio audio monitoring</p>
                  </div>
                  <Switch />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Alert Volume</p>
                  <Input type="range" className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Map Settings */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Map Configuration
                </CardTitle>
                <CardDescription>Configure situation map settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Mapbox API Token</p>
                  <Input type="password" placeholder="pk...." className="font-mono" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Auto-refresh Map</p>
                    <p className="text-sm text-muted-foreground">Update unit positions automatically</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Show Incident Zones</p>
                    <p className="text-sm text-muted-foreground">Display incident perimeters on map</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security
                </CardTitle>
                <CardDescription>Security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for all logins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Timeout Duration (minutes)</p>
                  <Input type="number" defaultValue={30} className="w-32" />
                </div>
              </CardContent>
            </Card>

            {/* Communications */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Radio className="h-5 w-5 text-primary" />
                  Communications
                </CardTitle>
                <CardDescription>Radio and dispatch settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Default Channel</p>
                  <select className="w-full p-2 rounded-lg bg-secondary/50 border border-border text-foreground">
                    <option>CH-1 - Command Net</option>
                    <option>CH-2 - Fire Tactical</option>
                    <option>CH-3 - Medical</option>
                    <option>CH-4 - Police Dispatch</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push-to-Talk</p>
                    <p className="text-sm text-muted-foreground">Enable PTT mode for radio</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Display */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Display
                </CardTitle>
                <CardDescription>Visual and theme settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Use dark theme interface</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Animations</p>
                    <p className="text-sm text-muted-foreground">Enable UI animations and effects</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
