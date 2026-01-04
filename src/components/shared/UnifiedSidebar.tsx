import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { StatusSelector } from '../ui/StatusSelector';
import { useUserStatus } from '../../contexts/UserStatusContext';
import { authService } from '../../lib/mockServices';
import type { User } from '../../lib/mockServices';
import {
  sidebarMenuConfig,
  getRoleFromPath,
  getRoleDisplayName,
  type UserRole,
} from './sidebarConfig';

interface UnifiedSidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

export function UnifiedSidebar({
  activePage,
  setActivePage,
  collapsed = false,
  setCollapsed,
}: UnifiedSidebarProps) {
  const location = useLocation();
  const { refreshSystemStatus } = useUserStatus();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  const role = getRoleFromPath(location.pathname) || 'employee';
  const menuItems = sidebarMenuConfig[role as UserRole];
  const displayName = getRoleDisplayName(role as UserRole);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        refreshSystemStatus();
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [refreshSystemStatus]);

  useEffect(() => {
    if (role === 'hr') {
      setOpenSubMenus(['employee-lifecycle', 'hiring']);
    }
  }, [role]);

  const displayUserName = user?.full_name || 'User';
  const displayUserTitle = user?.job_title || user?.role || role.charAt(0).toUpperCase() + role.slice(1);
  const userInitial = user?.full_name?.charAt(0)?.toUpperCase() || (role === 'hr' ? 'HR' : role === 'manager' ? 'M' : 'E');

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800">{displayName}</span>
          </div>
        )}
        {setCollapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}
      </div>

      <nav
        className="mt-4 px-2 overflow-y-auto overflow-x-hidden"
        style={{ height: 'calc(100vh - 180px)' }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id || item.subItems?.some((sub) => activePage === sub.id);
          const isSubMenuOpen = openSubMenus.includes(item.id);

          return (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => {
                  if (item.subItems) {
                    setOpenSubMenus((prev) =>
                      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                    );
                  } else {
                    setActivePage(item.id);
                  }
                }}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} shrink-0`} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.subItems && (
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSubMenuOpen ? 'rotate-90' : ''}`} />
                    )}
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>

              {!collapsed && item.subItems && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isSubMenuOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-8 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setActivePage(subItem.id);
                          }}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                            activePage === subItem.id
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                          }`}
                        >
                          <SubIcon className="w-4 h-4 mr-3 shrink-0" />
                          <span className="text-sm">{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-linear-to-r from-blue-50 to-purple-50 p-3 rounded-lg space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-white text-sm font-medium">{userInitial}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {isLoading ? 'Loading...' : displayUserName}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {isLoading ? '...' : displayUserTitle}
                </p>
              </div>
            </div>
            <StatusSelector />
          </div>
        </div>
      )}
    </div>
  );
}