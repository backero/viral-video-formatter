import { supabase } from "./supabase";

/**
 * Creates a brand-new form session in Supabase.
 * Returns the new session UUID string, or null on error.
 */
export async function createSession(data, currentPage = 1) {
  // Ensure the data has a slug and title
  if (!data.slug) {
    const defaultTitle = "Untitled Form";
    data.formTitle = defaultTitle;
    data.slug = defaultTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  const { data: row, error } = await supabase
    .from("form_sessions")
    .insert({ data, current_page: currentPage })
    .select("id")
    .single();

  if (error) {
    console.error("[sessionService] createSession error:", error.message);
    return null;
  }
  return row.id;
}

/**
 * Saves (upserts) form data to an existing session.
 * @param {string} id - The session UUID
 * @param {object} data - Full form data object
 * @param {number} currentPage - Current page number
 * @param {boolean} isSubmitted - Whether the form has been submitted
 */
export async function updateSession(
  id,
  data,
  currentPage = 1,
  isSubmitted = false,
) {
  const { error } = await supabase
    .from("form_sessions")
    .update({
      data,
      current_page: currentPage,
      is_submitted: isSubmitted,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("[sessionService] updateSession error:", error.message);
  }
}

/**
 * Loads a session by its UUID.
 */
export async function loadSession(id) {
  const { data: row, error } = await supabase
    .from("form_sessions")
    .select("id, data, current_page, is_submitted")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }
  return row;
}

/**
 * Loads a session by its slug (stored in JSON).
 */
export async function loadSessionBySlug(slug) {
  const { data: rows, error } = await supabase
    .from("form_sessions")
    .select("id, data, current_page, is_submitted")
    .eq("data->>slug", slug)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (error || !rows || rows.length === 0) {
    return null;
  }
  return rows[0];
}

/**
 * Lists the 50 most recent sessions (for the dashboard).
 */
export async function listSessions() {
  const { data: rows, error } = await supabase
    .from("form_sessions")
    .select("id, data, current_page, is_submitted, updated_at")
    .order("updated_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[sessionService] listSessions error:", error.message);
    return [];
  }
  return rows;
}

/**
 * Deletes a session by its UUID.
 */
export async function deleteSession(id) {
  const { error } = await supabase.from("form_sessions").delete().eq("id", id);

  if (error) {
    console.error("[sessionService] deleteSession error:", error.message);
    return false;
  }
  return true;
}
