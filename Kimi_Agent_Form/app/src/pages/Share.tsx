import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/Card';
import { useFormData } from '@/context/FormDataContext';
import Phase5 from './Phase5';

export default function Share() {
  const { contentId } = useParams<{ contentId: string }>();
  const { setData } = useFormData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const loadContent = async () => {
      if (!contentId) {
        setError('No content ID provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch content
        const response = await fetch(`/api/content/${contentId}`);
        if (!response.ok) {
          throw new Error('Content not found');
        }
        const content = await response.json();

        // Fetch view count
        try {
          const viewResponse = await fetch(`/api/content/${contentId}/view-count`);
          if (viewResponse.ok) {
            const viewData = await viewResponse.json();
            setViewCount(viewData.viewCount);
          }
        } catch {}

        // Load data into context
        if (content.phase1Data) setData('research', content.phase1Data.research || '');
        if (content.phase1Data?.selectedNugget) setData('selectedNugget', content.phase1Data.selectedNugget);
        if (content.phase1Data?.topic) setData('topic', content.phase1Data.topic || '');
        if (content.phase1Data?.whyTheyCare) setData('whyTheyCare', content.phase1Data.whyTheyCare || '');
        if (content.phase1Data?.proof) setData('proof', content.phase1Data.proof || '');

        if (content.phase2Data?.visualHook) setData('visualHook', content.phase2Data.visualHook);
        if (content.phase2Data?.writtenHook) setData('writtenHook', content.phase2Data.writtenHook);
        if (content.phase2Data?.audioHook) setData('audioHook', content.phase2Data.audioHook);

        if (content.phase3Data?.screenplay) setData('screenplay', content.phase3Data.screenplay);

        if (content.phase4Data?.validation) setData('validation', content.phase4Data.validation);

        setLoading(false);
      } catch (err) {
        console.error('Error loading shared content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
        setLoading(false);
      }
    };

    loadContent();
  }, [contentId, setData]);

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
          <div className="text-sm text-text-secondary">
            👁️ {viewCount} {viewCount === 1 ? 'view' : 'views'}
          </div>
        </div>
        <p className="text-text-secondary">
          This screenplay has been shared with you. Use the links below to edit or download.
        </p>
      </div>

      {/* Display Phase 5 Output */}
      <Phase5 isShared={true} />
    </Layout>
  );
}
