import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const meta: Meta = {
  title: 'UI/Card',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Card body content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Employee</CardTitle>
        <CardDescription>John Doe · john@example.com</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Role: Administrator</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const MetricCard: Story = {
  render: () => (
    <Card className="w-48">
      <CardHeader className="pb-2">
        <CardDescription>Total Assets</CardDescription>
        <CardTitle className="text-4xl">48</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge>Active</Badge>
      </CardContent>
    </Card>
  ),
};
