
import React, { useState } from 'react';
import { Shield, Database, Play, FileText, Plus, Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface DatabaseConfig {
  id: string;
  name: string;
  type: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

interface TestResult {
  id: string;
  test: string;
  status: 'passed' | 'failed' | 'warning';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
}

const Index = () => {
  const { toast } = useToast();
  const [databases, setDatabases] = useState<DatabaseConfig[]>([]);
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [newDb, setNewDb] = useState<Partial<DatabaseConfig>>({
    type: 'mysql'
  });

  const addDatabase = () => {
    if (!newDb.name || !newDb.host || !newDb.port || !newDb.username) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const database: DatabaseConfig = {
      id: Date.now().toString(),
      name: newDb.name!,
      type: newDb.type!,
      host: newDb.host!,
      port: newDb.port!,
      username: newDb.username!,
      password: newDb.password || '',
      database: newDb.database || ''
    };

    setDatabases([...databases, database]);
    setNewDb({ type: 'mysql' });
    toast({
      title: "Database Added",
      description: `${database.name} has been added successfully`,
    });
  };

  const removeDatabase = (id: string) => {
    setDatabases(databases.filter(db => db.id !== id));
    toast({
      title: "Database Removed",
      description: "Database configuration has been removed",
    });
  };

  const runSecurityTest = async (databaseId: string) => {
    const db = databases.find(d => d.id === databaseId);
    if (!db) return;

    setCurrentTest(databaseId);
    setTestProgress(0);
    setTestResults([]);

    // Simulate running security tests
    const tests = [
      'Authentication Configuration',
      'Password Policy Check',
      'Privilege Escalation Test',
      'SQL Injection Vulnerability',
      'Access Control Validation',
      'Encryption Configuration',
      'Backup Security Check',
      'Network Security Assessment'
    ];

    for (let i = 0; i < tests.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setTestProgress(((i + 1) / tests.length) * 100);
      
      // Generate mock results
      const result: TestResult = {
        id: Date.now().toString() + i,
        test: tests[i],
        status: Math.random() > 0.3 ? 'passed' : Math.random() > 0.5 ? 'warning' : 'failed',
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
        description: `Security assessment for ${tests[i]} completed`,
        recommendation: `Recommendation for improving ${tests[i]} security`
      };
      
      setTestResults(prev => [...prev, result]);
    }

    setCurrentTest(null);
    toast({
      title: "Security Scan Complete",
      description: `Completed security assessment for ${db.name}`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Hawk-Eye</h1>
          </div>
          <p className="text-xl text-slate-300">Database Security Scanner & Vulnerability Assessment</p>
        </div>

        <Tabs defaultValue="databases" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800 border-slate-700">
            <TabsTrigger value="databases" className="data-[state=active]:bg-purple-600">
              <Database className="h-4 w-4 mr-2" />
              Database Configuration
            </TabsTrigger>
            <TabsTrigger value="testing" className="data-[state=active]:bg-purple-600">
              <Play className="h-4 w-4 mr-2" />
              Security Testing
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600">
              <FileText className="h-4 w-4 mr-2" />
              Security Reports
            </TabsTrigger>
          </TabsList>

          {/* Database Configuration Tab */}
          <TabsContent value="databases" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Database
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure your database connections for security scanning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Database Name</Label>
                    <Input
                      id="name"
                      placeholder="Production DB"
                      value={newDb.name || ''}
                      onChange={(e) => setNewDb({...newDb, name: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-slate-300">Database Type</Label>
                    <Select value={newDb.type} onValueChange={(value) => setNewDb({...newDb, type: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select database type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="oracle">Oracle</SelectItem>
                        <SelectItem value="mssql">SQL Server</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="host" className="text-slate-300">Host</Label>
                    <Input
                      id="host"
                      placeholder="localhost"
                      value={newDb.host || ''}
                      onChange={(e) => setNewDb({...newDb, host: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="port" className="text-slate-300">Port</Label>
                    <Input
                      id="port"
                      placeholder="3306"
                      value={newDb.port || ''}
                      onChange={(e) => setNewDb({...newDb, port: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-slate-300">Username</Label>
                    <Input
                      id="username"
                      placeholder="admin"
                      value={newDb.username || ''}
                      onChange={(e) => setNewDb({...newDb, username: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-slate-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={newDb.password || ''}
                      onChange={(e) => setNewDb({...newDb, password: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <Button onClick={addDatabase} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Database
                </Button>
              </CardContent>
            </Card>

            {/* Configured Databases */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {databases.map((db) => (
                <Card key={db.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span>{db.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeDatabase(db.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {db.type.toUpperCase()} • {db.host}:{db.port}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div>Username: {db.username}</div>
                      <div>Database: {db.database || 'Default'}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Security Testing Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Run Security Tests</CardTitle>
                <CardDescription className="text-slate-400">
                  Execute comprehensive security assessments on your configured databases
                </CardDescription>
              </CardHeader>
              <CardContent>
                {databases.length === 0 ? (
                  <div className="text-center py-8">
                    <Database className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No databases configured. Add a database to begin testing.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {databases.map((db) => (
                      <Card key={db.id} className="bg-slate-700 border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-white font-medium">{db.name}</h3>
                              <p className="text-slate-400 text-sm">{db.type.toUpperCase()}</p>
                            </div>
                            <Button 
                              onClick={() => runSecurityTest(db.id)}
                              disabled={currentTest === db.id}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {currentTest === db.id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Testing...
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Run Test
                                </>
                              )}
                            </Button>
                          </div>
                          {currentTest === db.id && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm text-slate-300">
                                <span>Security Assessment Progress</span>
                                <span>{Math.round(testProgress)}%</span>
                              </div>
                              <Progress value={testProgress} className="bg-slate-600" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Security Assessment Results</CardTitle>
                <CardDescription className="text-slate-400">
                  Detailed security findings and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No test results available. Run security tests to see reports.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {['critical', 'high', 'medium', 'low'].map((severity) => {
                        const count = testResults.filter(r => r.severity === severity).length;
                        return (
                          <Card key={severity} className="bg-slate-700 border-slate-600">
                            <CardContent className="p-4 text-center">
                              <div className={`w-3 h-3 rounded-full ${getSeverityColor(severity)} mx-auto mb-2`}></div>
                              <div className="text-2xl font-bold text-white">{count}</div>
                              <div className="text-slate-400 text-sm capitalize">{severity}</div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Test Results */}
                    <div className="space-y-3">
                      {testResults.map((result) => (
                        <Card key={result.id} className="bg-slate-700 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                {getStatusIcon(result.status)}
                                <div>
                                  <h3 className="text-white font-medium">{result.test}</h3>
                                  <p className="text-slate-400 text-sm">{result.description}</p>
                                </div>
                              </div>
                              <Badge className={`${getSeverityColor(result.severity)} text-white`}>
                                {result.severity.toUpperCase()}
                              </Badge>
                            </div>
                            {result.status !== 'passed' && (
                              <div className="bg-slate-800 p-3 rounded border-l-4 border-purple-500">
                                <p className="text-slate-300 text-sm">
                                  <strong>Recommendation:</strong> {result.recommendation}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
