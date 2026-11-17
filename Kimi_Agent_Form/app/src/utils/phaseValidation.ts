import type { FormData } from '@/context/FormDataContext';

export interface PhaseValidationResult {
  isComplete: boolean;
  missingFields: string[];
  message: string;
}

export function validatePhase1(data: FormData): PhaseValidationResult {
  const missing: string[] = [];

  // Core video metadata
  if (!data.creator?.trim()) missing.push('Creator name');
  if (!data.actor?.trim()) missing.push('Actor name');
  if (!data.company?.trim()) missing.push('Company name');
  if (!data.platform?.trim()) missing.push('Platform');
  if (!data.estimatedLength?.trim()) missing.push('Estimated length');
  if (!data.language?.trim()) missing.push('Language');

  // Research & nuggets
  if (!data.research?.trim()) missing.push('Research content');
  if (data.nuggetOptions === null || data.nuggetOptions.length === 0) {
    missing.push('Extracted nuggets');
  }
  if (data.selectedNuggetIndex === null) missing.push('Selected nugget');

  // Topic (Forced Format)
  if (!data.niche?.trim()) missing.push('Niche');
  if (!data.subNiche?.trim()) missing.push('Sub-niche');
  if (!data.thePoint?.trim()) missing.push('The point');
  if (!data.whyTheyCare?.trim()) missing.push('Why they care');
  if (!data.theProof?.trim()) missing.push('The proof');

  // Value Delivery
  if (!data.actionableTakeaway?.trim()) missing.push('Actionable takeaway');
  if (!data.whyNugget?.trim()) missing.push('Why this nugget');
  if (!data.timeToValue?.trim()) missing.push('Time to value');
  if (!data.contentStyle?.trim()) missing.push('Content style');

  // Reference Video
  if (!data.refUrl?.trim()) missing.push('Reference video URL');
  if (!data.copyElement?.trim()) missing.push('Copy element');
  if (!data.copyDescription?.trim()) missing.push('Copy description');

  return {
    isComplete: missing.length === 0,
    missingFields: missing,
    message: missing.length === 0
      ? '✓ Phase 1 complete - Ready for Phase 2'
      : `Complete all ${missing.length} field(s) to proceed: ${missing.join(', ')}`,
  };
}

export function validatePhase2(data: FormData): PhaseValidationResult {
  const missing: string[] = [];

  // Phase 2 specific validations
  if (!data.phase2ContentType?.trim()) missing.push('Content type');
  if (!data.phase2Platform?.trim()) missing.push('Platform selection');
  if (!data.phase2SelectedCombo === null || !data.phase2SelectedCombo?.trim()) {
    missing.push('Format/structure combo');
  }
  if (!data.phase2CtaText?.trim()) missing.push('CTA text');

  // Check if hooks are approved (need to verify hook status)
  if (!data.phase2Hooks || Object.keys(data.phase2Hooks).length === 0) {
    missing.push('Hook approvals');
  } else {
    const hookStatuses = Object.values(data.phase2Hooks).map(h => h.status);
    if (!hookStatuses.every(status => status === 'APPROVED')) {
      missing.push('All hooks must be APPROVED');
    }
  }

  return {
    isComplete: missing.length === 0,
    missingFields: missing,
    message: missing.length === 0
      ? '✓ Phase 2 complete - Ready for Phase 3'
      : `Complete all ${missing.length} field(s) to proceed: ${missing.join(', ')}`,
  };
}

export function validatePhase3(data: FormData): PhaseValidationResult {
  const missing: string[] = [];

  // Phase 3 is generated screenplay, so we just check if it exists
  if (!data.screenplay || data.screenplay.length === 0) {
    missing.push('Generated screenplay');
  } else if (data.screenplay.length < 5) {
    missing.push(`Screenplay must have 5 scenes (has ${data.screenplay.length})`);
  } else {
    // Validate each scene has required fields
    data.screenplay.forEach((scene, index) => {
      if (!scene.dialogue?.trim()) {
        missing.push(`Scene ${index + 1}: Missing dialogue`);
      }
      if (!scene.action?.trim()) {
        missing.push(`Scene ${index + 1}: Missing action`);
      }
    });
  }

  return {
    isComplete: missing.length === 0,
    missingFields: missing,
    message: missing.length === 0
      ? '✓ Phase 3 complete - Ready for Phase 4'
      : `Complete all ${missing.length} field(s) to proceed: ${missing.join(', ')}`,
  };
}

export function validatePhase4(data: FormData): PhaseValidationResult {
  const missing: string[] = [];

  // Phase 4 requires validation checks to be run and fixes applied
  if (!data.validationChecks || Object.keys(data.validationChecks).length === 0) {
    missing.push('Validation checks');
  }

  // Check if at least some fixes were applied (checks marked as PASS)
  const passedChecks = Object.values(data.validationChecks).filter(v => v === true);
  if (passedChecks.length === 0) {
    missing.push('Apply at least one fix to proceed');
  }

  // Check if role approvals are set
  if (!data.validationChecks['roleApprovalsSet']) {
    missing.push('Role approvals (C, P, A, E)');
  }

  return {
    isComplete: missing.length === 0,
    missingFields: missing,
    message: missing.length === 0
      ? '✓ Phase 4 complete - Ready for Phase 5'
      : `Complete all ${missing.length} requirement(s) to proceed: ${missing.join(', ')}`,
  };
}

export function validatePhase5(data: FormData): PhaseValidationResult {
  const missing: string[] = [];

  // Phase 5 is output/review only - should auto-complete after Phase 4
  if (!data.screenplay || data.screenplay.length === 0) {
    missing.push('Final screenplay');
  }

  return {
    isComplete: missing.length === 0,
    missingFields: missing,
    message: '✓ Phase 5 - Final Output Review',
  };
}

export function getPhaseValidator(phaseNum: number) {
  switch (phaseNum) {
    case 1: return validatePhase1;
    case 2: return validatePhase2;
    case 3: return validatePhase3;
    case 4: return validatePhase4;
    case 5: return validatePhase5;
    default: return () => ({ isComplete: true, missingFields: [], message: '' });
  }
}
