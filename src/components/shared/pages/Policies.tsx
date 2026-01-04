import { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import {
  FileText,
  Eye,
  Search,
  Filter,
  Loader2,
  XCircle,
  Calendar,
  Tag
} from 'lucide-react';
import { policyService } from '../../../lib/mockServices';
import { toast } from 'sonner';

export function Policies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [policies, setPolicies] = useState<any[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError(null);
      const policiesData = await policyService.getPolicies();
      setPolicies(policiesData);
    } catch (err: any) {
      setError(err.message || 'Failed to load policies');
      toast.error('Failed to load policies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && (categoryFilter === 'all' || policy.category === categoryFilter);
  });

  const categories = Array.from(new Set(policies.map(p => p.category).filter(Boolean)));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
        <p className="text-sm text-muted-foreground">Loading policies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-destructive bg-destructive/10">
        <div className="flex items-center gap-3">
          <XCircle className="w-6 h-6 text-destructive" />
          <div>
            <h3 className="font-semibold text-destructive">Error Loading Policies</h3>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
        <Button onClick={fetchPolicies} className="mt-4">
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Company Policies</h2>
        <p className="text-sm text-muted-foreground mt-1">View all active organizational policies</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {filteredPolicies.length === 0 ? (
        <Card className="p-8">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm || categoryFilter !== 'all' ? 'No Policies Found' : 'No Active Policies'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm || categoryFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'There are no active policies at this time'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-base font-semibold text-foreground">{policy.title}</h3>
                    <Badge variant="outline">v{policy.version}</Badge>
                    <Badge variant="secondary">{policy.category}</Badge>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{policy.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-foreground">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Effective: <span className="font-medium">{formatDate(policy.effective_date)}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Updated: <span className="font-medium">{formatDate(policy.updated_at)}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Tag className="w-4 h-4" />
                      <span>Category: <span className="font-medium capitalize">{policy.category}</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <Button
                    onClick={() => {
                      setSelectedPolicy(policy);
                      setShowViewDialog(true);
                    }}
                    variant="default"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">{selectedPolicy?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline">v{selectedPolicy?.version}</Badge>
                <Badge variant="secondary">{selectedPolicy?.category}</Badge>
                <Badge variant="default">Active</Badge>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          {selectedPolicy && (
            <div className="space-y-6 py-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
                <p className="text-sm text-foreground">{selectedPolicy.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Policy Content</h4>
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <div className="text-sm text-foreground whitespace-pre-wrap">
                    {selectedPolicy.content || 'No content available'}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Effective Date</p>
                  <p className="font-medium">{formatDate(selectedPolicy.effective_date)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{formatDate(selectedPolicy.updated_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Version</p>
                  <p className="font-medium">v{selectedPolicy.version}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium capitalize">{selectedPolicy.category}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
