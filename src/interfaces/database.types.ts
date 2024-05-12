export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      area: {
        Row: {
          area_type_id: number;
          created_at: string;
          creator_uuid: string | null;
          id: number;
          label: string;
          updated_at: string;
          uuid: string;
        };
        Insert: {
          area_type_id: number;
          created_at?: string;
          creator_uuid?: string | null;
          id?: number;
          label: string;
          updated_at?: string;
          uuid: string;
        };
        Update: {
          area_type_id?: number;
          created_at?: string;
          creator_uuid?: string | null;
          id?: number;
          label?: string;
          updated_at?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'area_area_type_id_fkey';
            columns: ['area_type_id'];
            isOneToOne: false;
            referencedRelation: 'area_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'area_creator_uuid_fkey';
            columns: ['creator_uuid'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uuid'];
          },
        ];
      };
      area_type: {
        Row: {
          color: string;
          created_at: string;
          icon: string;
          id: number;
          label: string;
        };
        Insert: {
          color?: string;
          created_at?: string;
          icon: string;
          id?: number;
          label: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          icon?: string;
          id?: number;
          label?: string;
        };
        Relationships: [];
      };
      controller: {
        Row: {
          area_uuid: string;
          controller_type_id: number;
          created_at: string;
          creator_uuid: string;
          id: number;
          label: string;
          updated_at: string;
          uuid: string;
        };
        Insert: {
          area_uuid: string;
          controller_type_id: number;
          created_at?: string;
          creator_uuid: string;
          id?: number;
          label: string;
          updated_at?: string;
          uuid: string;
        };
        Update: {
          area_uuid?: string;
          controller_type_id?: number;
          created_at?: string;
          creator_uuid?: string;
          id?: number;
          label?: string;
          updated_at?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'controller_area_uuid_fkey';
            columns: ['area_uuid'];
            isOneToOne: false;
            referencedRelation: 'area';
            referencedColumns: ['uuid'];
          },
          {
            foreignKeyName: 'controller_controller_type_id_fkey';
            columns: ['controller_type_id'];
            isOneToOne: false;
            referencedRelation: 'controller_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'controller_creator_uuid_fkey';
            columns: ['creator_uuid'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uuid'];
          },
        ];
      };
      controller_type: {
        Row: {
          created_at: string;
          id: number;
          key: string;
          label: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          key: string;
          label: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          key?: string;
          label?: string;
        };
        Relationships: [];
      };
      data: {
        Row: {
          controller_uuid: string | null;
          created_at: string;
          data: Json;
          id: number;
        };
        Insert: {
          controller_uuid?: string | null;
          created_at?: string;
          data: Json;
          id?: number;
        };
        Update: {
          controller_uuid?: string | null;
          created_at?: string;
          data?: Json;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'data_controller_uuid_fkey';
            columns: ['controller_uuid'];
            isOneToOne: false;
            referencedRelation: 'controller';
            referencedColumns: ['uuid'];
          },
        ];
      };
      device: {
        Row: {
          active: boolean;
          controller_uuid: string;
          created_at: string;
          device_type_id: number;
          id: number;
          label: string;
          updated_at: string;
          uuid: string;
          value: number | null;
        };
        Insert: {
          active?: boolean;
          controller_uuid: string;
          created_at?: string;
          device_type_id: number;
          id?: number;
          label: string;
          updated_at?: string;
          uuid: string;
          value?: number | null;
        };
        Update: {
          active?: boolean;
          controller_uuid?: string;
          created_at?: string;
          device_type_id?: number;
          id?: number;
          label?: string;
          updated_at?: string;
          uuid?: string;
          value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'device_controller_uuid_fkey';
            columns: ['controller_uuid'];
            isOneToOne: false;
            referencedRelation: 'controller';
            referencedColumns: ['uuid'];
          },
          {
            foreignKeyName: 'device_device_type_id_fkey';
            columns: ['device_type_id'];
            isOneToOne: false;
            referencedRelation: 'device_type';
            referencedColumns: ['id'];
          },
        ];
      };
      device_type: {
        Row: {
          created_at: string;
          id: number;
          label: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          label: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          label?: string;
        };
        Relationships: [];
      };
      user: {
        Row: {
          created_at: string;
          first_name: string;
          id: number;
          last_name: string | null;
          location: string | null;
          updated_at: string;
          uuid: string;
        };
        Insert: {
          created_at?: string;
          first_name: string;
          id?: number;
          last_name?: string | null;
          location?: string | null;
          updated_at?: string;
          uuid: string;
        };
        Update: {
          created_at?: string;
          first_name?: string;
          id?: number;
          last_name?: string | null;
          location?: string | null;
          updated_at?: string;
          uuid?: string;
        };
        Relationships: [];
      };
      users_in_areas: {
        Row: {
          area_uuid: string;
          assigned_at: string;
          user_uuid: string;
        };
        Insert: {
          area_uuid: string;
          assigned_at?: string;
          user_uuid: string;
        };
        Update: {
          area_uuid?: string;
          assigned_at?: string;
          user_uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_in_areas_area_uuid_fkey';
            columns: ['area_uuid'];
            isOneToOne: false;
            referencedRelation: 'area';
            referencedColumns: ['uuid'];
          },
          {
            foreignKeyName: 'users_in_areas_user_uuid_fkey';
            columns: ['user_uuid'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uuid'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
