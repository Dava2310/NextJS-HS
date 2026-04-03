import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'UI/Colors',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const groups = [
  {
    label: 'Base',
    tokens: [
      { name: 'Background', variable: '--background' },
      { name: 'Foreground', variable: '--foreground' },
      { name: 'Border', variable: '--border' },
      { name: 'Input', variable: '--input' },
      { name: 'Ring', variable: '--ring' },
    ],
  },
  {
    label: 'Primary',
    tokens: [
      { name: 'Primary', variable: '--primary' },
      { name: 'Primary Foreground', variable: '--primary-foreground' },
    ],
  },
  {
    label: 'Secondary',
    tokens: [
      { name: 'Secondary', variable: '--secondary' },
      { name: 'Secondary Foreground', variable: '--secondary-foreground' },
    ],
  },
  {
    label: 'Muted',
    tokens: [
      { name: 'Muted', variable: '--muted' },
      { name: 'Muted Foreground', variable: '--muted-foreground' },
    ],
  },
  {
    label: 'Accent',
    tokens: [
      { name: 'Accent', variable: '--accent' },
      { name: 'Accent Foreground', variable: '--accent-foreground' },
    ],
  },
  {
    label: 'Destructive',
    tokens: [
      { name: 'Destructive', variable: '--destructive' },
      { name: 'Destructive Foreground', variable: '--destructive-foreground' },
    ],
  },
  {
    label: 'Card',
    tokens: [
      { name: 'Card', variable: '--card' },
      { name: 'Card Foreground', variable: '--card-foreground' },
    ],
  },
  {
    label: 'Sidebar',
    tokens: [
      { name: 'Sidebar', variable: '--sidebar' },
      { name: 'Sidebar Foreground', variable: '--sidebar-foreground' },
      { name: 'Sidebar Primary', variable: '--sidebar-primary' },
      { name: 'Sidebar Accent', variable: '--sidebar-accent' },
      { name: 'Sidebar Border', variable: '--sidebar-border' },
    ],
  },
  {
    label: 'Chart',
    tokens: [
      { name: 'Chart 1', variable: '--chart-1' },
      { name: 'Chart 2', variable: '--chart-2' },
      { name: 'Chart 3', variable: '--chart-3' },
      { name: 'Chart 4', variable: '--chart-4' },
      { name: 'Chart 5', variable: '--chart-5' },
    ],
  },
];

function Swatch({ name, variable }: { name: string; variable: string }) {
  const value = `var(${variable})`;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-12 w-full rounded-md border border-border" style={{ background: value }} />
      <p className="text-xs font-medium leading-none">{name}</p>
      <p className="font-mono text-xs text-muted-foreground">{variable}</p>
    </div>
  );
}

export const Palette: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
            {group.label}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {group.tokens.map((token) => (
              <Swatch key={token.variable} name={token.name} variable={token.variable} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
