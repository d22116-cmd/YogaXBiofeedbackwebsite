
import React from 'react';
import { Button, Card, Input, Badge, Modal, Tabs, Spinner, Skeleton } from './index';
import { Star, Mail, Shield, Zap } from 'lucide-react';

const ComponentsDemo: React.FC = () => {
  return (
    <div className="p-12 space-y-20 max-w-5xl mx-auto">
      <section className="space-y-6">
        <h3 className="text-xl font-bold">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Action</Button>
          <Button variant="premium">Premium Pro</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Delete Data</Button>
          <Button isLoading>Processing</Button>
          <Button rightIcon={<Zap className="w-4 h-4" />}>Unlock All</Button>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold">Inputs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Email Address" placeholder="alex@example.com" leftIcon={<Mail className="w-4 h-4" />} />
          <Input label="Secure Password" type="password" placeholder="••••••••" />
          <Input label="Search Guru" error="No guru found with this name" placeholder="Start typing..." />
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold">Badges & Status</h3>
        <div className="flex gap-4">
          <Badge variant="success">Active</Badge>
          <Badge variant="error">Critical</Badge>
          <Badge variant="warning">Syncing</Badge>
          <Badge variant="primary">New Feature</Badge>
          <Badge variant="outline">v2.4.0</Badge>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold">Cards & Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverable className="p-8">
            <h4 className="font-bold mb-4">Mastery Card</h4>
            <p className="text-gray-500 text-sm">Consistent practice leads to neurological rewiring.</p>
          </Card>
          
          <Card className="p-8 flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">Loading Stats</p>
          </Card>

          <Card className="p-8 space-y-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton circle className="w-8 h-8" />
              <Skeleton className="h-8 flex-1" />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ComponentsDemo;
