/**
 * SECURITY BOUNDARY. Nunca confie em ?preview, headers ou localStorage como prova de papel.
 * Autenticação ainda não implementada: a identidade verificada é sempre visitante.
 */
export type VerifiedRole = "aluno" | "professor" | "administrador";
export type Viewer =
  | { authenticated: false; role: "visitante"; userId: null }
  | { authenticated: true; role: VerifiedRole; userId: string };

export async function getVerifiedViewer(): Promise<Viewer> {
  // TODO: conectar provedor de identidade e verificar sessão no servidor.
  return { authenticated: false, role: "visitante", userId: null };
}

export function requireRole(viewer: Viewer, allowed: readonly VerifiedRole[]): void {
  if (!viewer.authenticated || !allowed.includes(viewer.role)) {
    throw new Error("Acesso não autorizado");
  }
}
