import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/Card';
import { useFormData } from '@/context/FormDataContext';
import Phase5 from './Phase5';

export default function Share() {
  const { contentId } = useParams<{ contentId: string }>();
  const { updateData } = useFormData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!contentId) {
        setError('No content ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/content/${contentId}`);
        if (!response.ok) {
          throw new Error('Content not found');
        }
        const content = await response.json();

        // Load data into context, and remember this contentId so that if this
        // viewer edits and hits "Save & Share" again, it updates this same
        // link instead of creating a new one.
        updateData({
          research: content.phase1Data?.research ?? '',
          selectedNuggetIndex: content.phase1Data?.selectedNuggetIndex ?? null,
          thePoint: content.phase1Data?.topic ?? '',
          whyTheyCare: content.phase1Data?.whyTheyCare ?? '',
          theProof: content.phase1Data?.proof ?? '',
          screenplay: content.phase3Data?.screenplay ?? null,
          validationChecks: content.phase4Data?.validationChecks ?? {},
          sharedContentId: contentId,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error loading shared content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
        setLoading(false);
      }
    };

    loadContent();
  }, [contentId, updateData]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center">
            <div className="text-text-secondary">Loading shared content...</div>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center border-l-4 border-red-500">
            <div className="text-red-500 font-semibold">{error}</div>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Back to Home
            </button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text-primary">Shared Screenplay</h1>
          <button
            onClick={() => navigate('/phase/5')}
            className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-accent-input hover:opacity-90 transition-opacity"
          >
            Continue Editing This Project
          </button>
        </div>
        <p className="text-text-secondary">
          This screenplay has been shared with you. Click "Continue Editing" to make changes and
          save them back to this same link.
        </p>
      </div>

      {/* Read-only preview of Phase 5 Output */}
      <Phase5 isShared={true} />
    </Layout>
  );
}
