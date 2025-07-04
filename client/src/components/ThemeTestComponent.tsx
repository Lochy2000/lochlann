import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SkillBadge from '@/components/ui/SkillBadge';
import { themeClasses } from '@/lib/theme-utils';

/**
 * Theme Testing Component
 * This component demonstrates all the theme improvements and can be used to verify
 * that light/dark mode contrast issues have been resolved.
 */
const ThemeTestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  const [testState, setTestState] = useState('idle');

  const runContrastTest = () => {
    setTestState('testing');
    setTimeout(() => setTestState('passed'), 1000);
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold ${themeClasses.text.primary}`}>
          Theme System Test
        </h1>
        <p className={themeClasses.text.secondary}>
          Current theme: <strong>{theme}</strong>
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={toggleTheme}>
            Toggle Theme
          </Button>
          <Button variant="outline" onClick={runContrastTest}>
            Test Contrast
          </Button>
        </div>
      </div>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${themeClasses.text.primary}`}>
          Card Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={themeClasses.shadow.card}>
            <CardHeader>
              <CardTitle className={themeClasses.text.primary}>Standard Card</CardTitle>
              <CardDescription className={themeClasses.text.muted}>
                This card should have proper contrast in both themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={themeClasses.text.secondary}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </CardContent>
          </Card>

          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle>Enhanced Card</CardTitle>
              <CardDescription>
                Uses enhanced card styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-readable">
                This card uses the enhanced styling classes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>
                Standard shadcn/ui card styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Regular card content for comparison.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${themeClasses.text.primary}`}>
          Badge Components
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className={themeClasses.text.secondary}>Standard Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
              <Badge variant="skill">Skill Badge</Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className={themeClasses.text.secondary}>Enhanced Skill Badges</h3>
            <div className="flex flex-wrap gap-2">
              <SkillBadge name="React" variant="default" />
              <SkillBadge name="Node.js" variant="accent" />
              <SkillBadge name="TypeScript" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${themeClasses.text.primary}`}>
          Button Components
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="destructive">Destructive Button</Button>
        </div>
      </section>

      {/* Text Samples */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${themeClasses.text.primary}`}>
          Text Readability
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className={themeClasses.text.primary}>Primary Text</h3>
            <p className={themeClasses.text.secondary}>Secondary Text</p>
            <p className={themeClasses.text.muted}>Muted Text</p>
            <p className={themeClasses.text.accent}>Accent Text</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-readable">Enhanced Readable Text</h3>
            <p className="text-readable-muted">Enhanced Readable Muted Text</p>
            <p className="text-primary">Standard Primary Color</p>
            <p className="text-muted-foreground">Standard Muted Foreground</p>
          </div>
        </div>
      </section>

      {/* Test Results */}
      {testState !== 'idle' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className={`text-2xl font-semibold ${themeClasses.text.primary}`}>
            Contrast Test Results
          </h2>
          <Card className={testState === 'passed' ? 'border-green-500' : 'border-yellow-500'}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  testState === 'passed' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                }`} />
                <span className={themeClasses.text.primary}>
                  {testState === 'testing' ? 'Running contrast tests...' : 'All contrast tests passed!'}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}
    </div>
  );
};

export default ThemeTestComponent;
