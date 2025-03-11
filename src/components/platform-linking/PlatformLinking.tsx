import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

const PlatformLinking: React.FC = () => {
  const { getAllPlatforms, linkPlatform, unlinkPlatform, isLoading } = useAuth();
  const { t } = useLanguage();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const platforms = getAllPlatforms();

  const handleLinkPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedPlatform || !username) {
      setError('Please select a platform and enter your username');
      return;
    }

    try {
      const result = await linkPlatform(selectedPlatform, username);
      if (result) {
        setSuccess(t('platform.linkSuccess'));
        setSelectedPlatform(null);
        setUsername('');
      } else {
        setError(t('platform.linkFailed'));
      }
    } catch (err) {
      setError(t('common.error'));
      console.error(err);
    }
  };

  const handleUnlinkPlatform = async (platformId: string) => {
    setError('');
    setSuccess('');

    try {
      const result = await unlinkPlatform(platformId);
      if (result) {
        setSuccess(t('platform.unlinkSuccess'));
      } else {
        setError(t('platform.unlinkFailed'));
      }
    } catch (err) {
      setError(t('common.error'));
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('platform.title')}</h1>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Platform Linking Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('platform.linkAccount')}</CardTitle>
          <CardDescription>
            {t('platform.linkPlatformPrompt')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLinkPlatform} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div 
                  key={platform.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPlatform === platform.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-lg font-medium">{platform.icon.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      {platform.isLinked && (
                        <div className="text-sm text-green-600">
                          {t('platform.platformUsername')}: {platform.username}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedPlatform && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('platform.platformUsername')}</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    placeholder={`Your ${platforms.find(p => p.id === selectedPlatform)?.name} username`}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t('common.loading') : t('platform.link')}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Linked Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.linkedPlatforms')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platforms.filter(p => p.isLinked).map((platform) => (
              <div key={platform.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg font-medium">{platform.icon.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-gray-500">{platform.username}</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUnlinkPlatform(platform.id)}
                  disabled={isLoading}
                >
                  {t('platform.unlink')}
                </Button>
              </div>
            ))}

            {platforms.filter(p => p.isLinked).length === 0 && (
              <div className="text-center py-4 text-gray-500">
                {t('platform.noLinkedPlatforms')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformLinking;
