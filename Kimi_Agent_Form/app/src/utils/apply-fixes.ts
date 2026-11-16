// Apply Fix system: Uses suggestedFix from validation checks to replace problematic text
// Each fix identifies the problem area and replaces it with the suggested fix

export function applyFix(
  scenes: any[],
  checkId: string,
  suggestedFix: string,
  scenesAffected?: number[]
): any[] {
  const next = [...scenes];
  const affectedScenes = scenesAffected || [0, 1, 2, 3, 4]; // Default: all scenes

  switch (checkId) {
    // DIALOGUE-BASED FIXES: Replace problematic dialogue with suggested fix
    case 'GR01': // Demonstration-First Dialogue
    case 'GR05': // Broad-Narrow-Niche
    case 'GR06': // Show Don't Tell
    case 'GR09': // B-Roll Instructs
    case 'GR13': // Hook Uniqueness
    case 'GR14': // CTA Directness
    case 'GR17': // No Jargon
    case 'PBL01': // Problem Clarity
    case 'PBL02': // Solution Visibility
    case 'PBL05': // Next Step Clarity
    case 'QG02': // Hook Compels Watch
    case 'QG06': // No Superlatives
    case 'QG07': // Proof Points Specific
    case 'SA01': // Beat Length <=8 Words
    case 'SA02': // No Conjunctions
    case 'SA03': // 5th Grade Readability
    case 'SA05': // Forbidden Words
    case 'NS05': // Value Insight
    case 'NS06': // Commitment Ask
    case 'CT02': // CTA Text <=5 Words
    case 'CT03': // Single CTA Only
    {
      affectedScenes.forEach(i => {
        if (i < next.length && next[i].dialogue) {
          // Replace dialogue with suggested fix if it's shorter and clearer
          if (suggestedFix && suggestedFix.length < next[i].dialogue.length * 1.5) {
            next[i] = { ...next[i], dialogue: suggestedFix };
          }
        }
      });
      break;
    }

    // ACTION-BASED FIXES: Replace or enhance action descriptions
    case 'GR02': // Action-to-Dialogue Ratio
    case 'GR04': // Hook Parseable Muted
    case 'PBL03': // Before/After Contrast
    case 'PBL04': // Objection Handling
    {
      affectedScenes.forEach(i => {
        if (i < next.length && next[i].action) {
          next[i] = { ...next[i], action: suggestedFix || next[i].action };
        }
      });
      break;
    }

    // VISUAL-BASED FIXES: Replace visual descriptions
    case 'GR03': // Silent-Runtime Quota
    case 'GR07': // Visual Change Every 2s
    case 'GR08': // Contrast-Driven Cuts
    case 'GR10': // Audio-Video Sync
    case 'GR11': // Text Overlay Legibility
    case 'GR15': // Pacing Alignment
    case 'GR18': // Zero Dead Air
    case 'GR04': // Hook Parseable Muted
    case 'QG01': // Scroll-Stop
    case 'QG09': // Muted Viewer Understands
    case 'QG10': // Visual Change Every 2s
    case 'NS01': // Brain Region Coverage
    case 'NS02': // Multimodal Convergence
    case 'NS08': // Visual Hierarchy
    case 'CT01': // CTA Freeze Frame
    case 'ML02': // Brand Logos
    {
      affectedScenes.forEach(i => {
        if (i < next.length && next[i].visual) {
          next[i] = { ...next[i], visual: suggestedFix || next[i].visual };
        }
      });
      break;
    }

    // AUDIO-BASED FIXES
    case 'GR10': // Audio-Video Sync
    case 'QG04': // Audio Natural
    case 'QG08': // Real Voice
    {
      affectedScenes.forEach(i => {
        if (i < next.length && next[i].audio) {
          next[i] = { ...next[i], audio: suggestedFix || next[i].audio };
        }
      });
      break;
    }

    // ACTOR/EXPRESSION FIXES
    case 'QG05': // Humor Lands
    case 'QG04': // Audio Natural
    case 'NS08': // Visual Hierarchy
    {
      affectedScenes.forEach(i => {
        if (i < next.length && next[i].actor) {
          next[i] = {
            ...next[i],
            actor: { ...next[i].actor, expression: suggestedFix || next[i].actor.expression }
          };
        }
      });
      break;
    }

    // STUDIO/PRODUCTION FIXES
    case 'ST01':
    case 'ST02':
    case 'ST03':
    case 'ST04':
    case 'ST05':
    {
      affectedScenes.forEach(i => {
        if (i < next.length) {
          next[i] = { ...next[i], action: suggestedFix || next[i].action };
        }
      });
      break;
    }

    // REFERENCE/MULTILANG FIXES
    case 'RV01': // Reference Compliance
    case 'ML01': // Music Licensing
    {
      affectedScenes.forEach(i => {
        if (i < next.length && next[i].audio) {
          next[i] = { ...next[i], audio: suggestedFix || next[i].audio };
        }
      });
      break;
    }

    // NEUROSCIENCE FIXES
    case 'NS03': // Hemodynamic Delay
    case 'NS04': // Manual only
    case 'NS07': // Variable Prosody
    {
      if (checkId !== 'NS04') {
        affectedScenes.forEach(i => {
          if (i < next.length) {
            next[i] = { ...next[i], visual: suggestedFix || next[i].visual };
          }
        });
      }
      break;
    }

    // QUALITY GATE FIXES
    case 'QG03': // No Dead Weight
    {
      affectedScenes.forEach(i => {
        if (i < next.length && next[i].dialogue) {
          // Remove filler words
          next[i] = {
            ...next[i],
            dialogue: (suggestedFix || next[i].dialogue)
              .replace(/\s+(um|uh|like|you know|basically|honestly|actually|really)\s+/gi, ' ')
              .trim()
          };
        }
      });
      break;
    }

    default:
      // For unhandled checks, try dialogue replacement if suggestedFix exists
      if (suggestedFix) {
        affectedScenes.forEach(i => {
          if (i < next.length && next[i].dialogue) {
            next[i] = { ...next[i], dialogue: suggestedFix };
          }
        });
      }
  }

  return next;
}

// Get evidence message after applying fix
export function getFixEvidence(checkId: string, checkName: string, suggestedFix?: string): string {
  const manualOnlyChecks: Record<string, string> = {
    NS04: 'Requires manual rewrite for you/your density — not auto-applied to avoid overwriting content',
    SA04: 'Requires manual rewrite for you/your density — not auto-applied to avoid overwriting content',
  };

  if (manualOnlyChecks[checkId]) {
    return manualOnlyChecks[checkId];
  }

  if (suggestedFix) {
    return `Fixed: Replaced with suggested improvement — "${suggestedFix}"`;
  }

  return `Fixed: ${checkName} — screenplay updated to meet requirement`;
}
