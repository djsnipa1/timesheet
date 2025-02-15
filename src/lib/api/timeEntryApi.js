export const fetchJson = async (endpoint, errorMessage) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(errorMessage);
    return await response.json();
  } catch (err) {
    throw new Error(`${errorMessage}: ${err.message}`);
  }
};

export const parseTimeEntry = (entry) => ({
  id: entry.id,
  description: entry.description,
  start: new Date(entry.timeInterval.start),
  end: new Date(entry.timeInterval.end),
  duration: entry.timeInterval.duration,
  workspaceId: entry.workspaceId,
  userId: entry.userId,
  billable: entry.billable,
  projectId: entry.projectId,
  isLocked: entry.isLocked
});