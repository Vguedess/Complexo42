-- COMPLEXO42 — ESQUEMA PROPOSTO / NÃO EXECUTAR SEM REVIEW LGPD, AUTH E AUTORIZAÇÃO
-- PostgreSQL 16+. UUIDs gerados no banco. Nenhum dado de exemplo ou PII real.
-- MODELO CANÔNICO v0.2: IDs internos independentes de Valete, Academia e provedor de autenticação.
-- Este arquivo ainda NÃO foi executado. Depois da primeira migração aplicada, não o editar mais.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE members (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 display_name varchar(120) NOT NULL,
 city varchar(80),
 state_code char(2),
 social_links jsonb NOT NULL DEFAULT '[]'::jsonb,
 profile_visibility varchar(20) NOT NULL DEFAULT 'restricted' CHECK (profile_visibility IN ('restricted','members')),
 status varchar(16) NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended','deleted')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 deleted_at timestamptz,
 CONSTRAINT city_state_pair CHECK ((city IS NULL) = (state_code IS NULL))
);
-- Login federado/desacoplado: trocar Clerk/Better Auth/etc. não muda members.id.
-- "provider_subject" identifica a conta externa, não contém token ou senha.
CREATE TABLE member_auth_identities (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
 provider varchar(80) NOT NULL,
 provider_subject text NOT NULL,
 linked_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(provider,provider_subject)
);
CREATE INDEX idx_member_auth_identities_member ON member_auth_identities(member_id);

-- Contato privado fora da consulta geral de perfis. Acesso sempre autorizado no backend.
CREATE TABLE member_contacts (
 member_id uuid PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE,
 whatsapp varchar(24),
 contact_share_allowed boolean NOT NULL DEFAULT false,
 updated_at timestamptz NOT NULL DEFAULT now()
);

-- "Feitos" são coleções independentes, permitindo múltiplas evidências sem novas colunas.
CREATE TABLE member_accomplishments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
 title varchar(180) NOT NULL,
 description text,
 evidence_url text,
 visibility varchar(20) NOT NULL DEFAULT 'restricted'
   CHECK (visibility IN ('restricted','members')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_member_accomplishments_member ON member_accomplishments(member_id);

-- Correspondência de IDs de sistemas oficiais APENAS se formalmente autorizada.
-- Não implica importação de dados nem integração com qualquer banco de terceiros.
CREATE TABLE member_external_refs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
 source_system varchar(120) NOT NULL,
 external_subject_id text NOT NULL,
 linked_at timestamptz NOT NULL DEFAULT now(),
 last_synced_at timestamptz,
 UNIQUE(source_system, external_subject_id)
);
CREATE INDEX idx_member_external_refs_member ON member_external_refs(member_id);

CREATE TABLE skills (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), label varchar(100) NOT NULL UNIQUE);
CREATE TABLE member_skills (
 member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
 skill_id uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
 PRIMARY KEY(member_id,skill_id)
);
CREATE TABLE teams (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name varchar(140) NOT NULL,
 description text,
 lifecycle varchar(20) NOT NULL DEFAULT 'forming' CHECK (lifecycle IN ('forming','active','archived')),
 created_by uuid REFERENCES members(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE team_members (
 team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
 member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
 team_role varchar(16) NOT NULL DEFAULT 'member' CHECK (team_role IN ('member','lead')),
 joined_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(team_id,member_id)
);
CREATE TABLE memberships_roles (
 member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
 role varchar(20) NOT NULL CHECK (role IN ('student','team_lead','evaluator','administrator')),
 scope_team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
 granted_by uuid REFERENCES members(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE actions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
 title varchar(180) NOT NULL,
 description text,
 acceptance_criteria text,
 status varchar(24) NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','doing','review','done')),
 created_by uuid REFERENCES members(id) ON DELETE SET NULL,
 assigned_to uuid REFERENCES members(id) ON DELETE SET NULL,
 due_at timestamptz,
 validated_by uuid REFERENCES members(id) ON DELETE SET NULL,
 validated_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_actions_team_status ON actions(team_id,status);
CREATE TABLE medal_types (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name varchar(100) NOT NULL UNIQUE,
 description text NOT NULL, category varchar(80)
);
CREATE TABLE medal_issuer_scopes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 issuer_member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
 medal_type_id uuid NOT NULL REFERENCES medal_types(id) ON DELETE CASCADE,
 team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
 granted_by uuid REFERENCES members(id) ON DELETE SET NULL,
 valid_until timestamptz
);
CREATE TABLE awarded_medals (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 medal_type_id uuid NOT NULL REFERENCES medal_types(id),
 recipient_id uuid NOT NULL REFERENCES members(id),
 issuer_id uuid NOT NULL REFERENCES members(id),
 action_id uuid REFERENCES actions(id) ON DELETE SET NULL,
 evidence_summary text NOT NULL,
 awarded_at timestamptz NOT NULL DEFAULT now(),
 revoked_at timestamptz,
 revoked_reason text
);
CREATE TABLE evaluations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 recipient_id uuid NOT NULL REFERENCES members(id),
 evaluator_id uuid NOT NULL REFERENCES members(id),
 team_id uuid NOT NULL REFERENCES teams(id),
 action_id uuid REFERENCES actions(id) ON DELETE SET NULL,
 criterion varchar(120) NOT NULL,
 score smallint CHECK (score BETWEEN 1 AND 5),
 private_feedback text NOT NULL,
 dispute_status varchar(20) NOT NULL DEFAULT 'none' CHECK (dispute_status IN ('none','requested','under_review','resolved')),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_evaluations_recipient ON evaluations(recipient_id,created_at DESC);
CREATE TABLE rooms (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
 title varchar(120) NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE room_messages (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 room_id uuid NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
 sender_id uuid REFERENCES members(id) ON DELETE SET NULL,
 body text NOT NULL CHECK (length(body) BETWEEN 1 AND 4000),
 created_at timestamptz NOT NULL DEFAULT now(),
 deleted_at timestamptz
);
CREATE INDEX idx_messages_room_time ON room_messages(room_id,created_at DESC);
CREATE TABLE audit_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 actor_id uuid REFERENCES members(id) ON DELETE SET NULL,
 entity_type varchar(50) NOT NULL,
 entity_id uuid,
 event_type varchar(80) NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
 -- Não gravar telefone, avaliação, IP, payload ou conversa em auditoria.
);
-- ATENÇÃO: RLS/políticas por recurso e autorização no backend NÃO estão implementadas.
-- Este esquema é exclusivamente uma especificação inicial e não deve ir a produção.
