import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const Dashboard: React.FC = () => {
  const { user, getLinkedPlatforms } = useAuth();
  const { t } = useLanguage();
  const linkedPlatforms = getLinkedPlatforms();

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'accountCreated',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    ...(linkedPlatforms.map((platform, index) => ({
      id: index + 2,
      type: 'platformLinked',
      platform: platform.name,
      date: new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000),
    }))),
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome')}, {user?.username}!
        </h1>
        <p className="opacity-90">
          {t('app.tagline')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.accountSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('common.email')}</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('common.username')}</span>
                <span className="font-medium">{user?.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium">
                  {user?.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Linked Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.linkedPlatforms')}</CardTitle>
          </CardHeader>
          <CardContent>
            {linkedPlatforms.length > 0 ? (
              <div className="space-y-4">
                {linkedPlatforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium">{platform.icon.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-sm text-gray-500">{platform.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                {t('platform.noLinkedPlatforms')}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <div>
                      <div className="font-medium">
                        {activity.type === 'accountCreated' 
                          ? t('dashboard.accountCreated')
                          : activity.type === 'platformLinked'
                            ? `${t('dashboard.platformLinked')}: ${activity.platform}`
                            : activity.type}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                {t('dashboard.noActivity')}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
