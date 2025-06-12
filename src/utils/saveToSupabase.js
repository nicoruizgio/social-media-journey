import { supabase } from './supabaseClient';

export async function saveJourneyToSupabase(participantId, nodes, edges) {
  const nodesData = nodes.map((node) => ({
    id: node.id,
    label: node.data.label,
  }));

  const edgesData = edges.map((edge) => {
    const connection = edge.data.innerSelectedOption
      ? `Communication with ${edge.data.innerSelectedOption}`
      : edge.data.selectedOption;
    return {
      id: `${edge.source}-${edge.target}`,
      sourceId: edge.source,
      targetId: edge.target,
      sourceLabel: edge.data.sourceLabel,
      targetLabel: edge.data.targetLabel,
      connection: connection,
    };
  });

  const data = {
    nodes: nodesData,
    edges: edgesData,
  };

  const { error } = await supabase
    .from('social_media_journeys')
    .upsert([{ participant_id: participantId, data }], { onConflict: ['participant_id'] });
  return error;
}