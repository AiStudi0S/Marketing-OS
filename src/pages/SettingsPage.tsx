import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSaveProfile = () => {
    if (!displayName.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 3000);
  };

  const handleSavePassword = () => {
    if (!currentPw || !newPw || !confirmPw) {
      setPasswordError('All password fields are required.');
      return;
    }
    if (newPw !== confirmPw) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }
    if (newPw.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    setPasswordError('');
    setSavedPassword(true);
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setTimeout(() => setSavedPassword(false), 3000);
  };

  const inputStyle = { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gradient-cyan">Settings</h1>
        <p style={{ color: '#94a3b8' }}>Manage your account preferences and security</p>
      </div>

      {/* Profile Settings */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label style={{ color: '#94a3b8' }}>Display Name</Label>
            <Input value={displayName} onChange={e => setDisplayName(e.target.value)} style={inputStyle} />
          </div>
          <div className="space-y-2">
            <Label style={{ color: '#94a3b8' }}>Email Address</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" style={inputStyle} />
          </div>
          <div className="space-y-2">
            <Label style={{ color: '#94a3b8' }}>Role</Label>
            <div className="px-3 py-2 rounded-md text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: '#94a3b8', border: '1px solid rgba(0,245,255,0.1)' }}>
              {currentUser?.role} — <span style={{ color: '#94a3b8', fontSize: '12px' }}>Contact admin to change role</span>
            </div>
          </div>
          {emailError && (
            <div className="text-sm" style={{ color: '#ff4466' }}>{emailError}</div>
          )}
          {savedProfile && (
            <div className="flex items-center gap-2 text-sm" style={{ color: '#00ff88' }}>
              <CheckCircle2 size={16} /> Profile saved successfully!
            </div>
          )}
          <Button onClick={handleSaveProfile} style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', color: '#0a0a1a' }}>
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: '#e2e8f0' }}>Dark Mode</p>
              <p className="text-sm" style={{ color: '#94a3b8' }}>Use the dark Neo-Glow theme</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox id="email-notif" checked={emailNotif} onCheckedChange={v => setEmailNotif(!!v)} />
            <div>
              <Label htmlFor="email-notif" style={{ color: '#e2e8f0' }}>Email Notifications</Label>
              <p className="text-xs" style={{ color: '#94a3b8' }}>Receive alerts and updates via email</p>
            </div>
          </div>
          <Separator style={{ backgroundColor: 'rgba(0,245,255,0.1)' }} />
          <div className="flex items-center gap-3">
            <Checkbox id="push-notif" checked={pushNotif} onCheckedChange={v => setPushNotif(!!v)} />
            <div>
              <Label htmlFor="push-notif" style={{ color: '#e2e8f0' }}>Push Notifications</Label>
              <p className="text-xs" style={{ color: '#94a3b8' }}>Browser push notifications for real-time alerts</p>
            </div>
          </div>
          <Separator style={{ backgroundColor: 'rgba(0,245,255,0.1)' }} />
          <div className="flex items-center gap-3">
            <Checkbox id="weekly-digest" checked={weeklyDigest} onCheckedChange={v => setWeeklyDigest(!!v)} />
            <div>
              <Label htmlFor="weekly-digest" style={{ color: '#e2e8f0' }}>Weekly Digest</Label>
              <p className="text-xs" style={{ color: '#94a3b8' }}>Summary of weekly activity and metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label style={{ color: '#94a3b8' }}>Current Password</Label>
            <Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>
          <div className="space-y-2">
            <Label style={{ color: '#94a3b8' }}>New Password</Label>
            <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>
          <div className="space-y-2">
            <Label style={{ color: '#94a3b8' }}>Confirm New Password</Label>
            <Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>
          {passwordError && (
            <div className="text-sm" style={{ color: '#ff4466' }}>{passwordError}</div>
          )}
          {savedPassword && (
            <div className="flex items-center gap-2 text-sm" style={{ color: '#00ff88' }}>
              <CheckCircle2 size={16} /> Password updated successfully!
            </div>
          )}
          <Button onClick={handleSavePassword} style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', color: '#0a0a1a' }}>
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
