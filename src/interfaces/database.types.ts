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
          area_type_id: string;
          created_at: string;
          creator_id: string;
          id: string;
          label: string;
          updated_at: string;
        };
        Insert: {
          area_type_id: string;
          created_at?: string;
          creator_id: string;
          id: string;
          label: string;
          updated_at?: string;
        };
        Update: {
          area_type_id?: string;
          created_at?: string;
          creator_id?: string;
          id?: string;
          label?: string;
          updated_at?: string;
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
            foreignKeyName: 'area_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      area_type: {
        Row: {
          color: string;
          icon: string;
          id: string;
          label: string;
        };
        Insert: {
          color?: string;
          icon: string;
          id: string;
          label: string;
        };
        Update: {
          color?: string;
          icon?: string;
          id?: string;
          label?: string;
        };
        Relationships: [];
      };
      controller: {
        Row: {
          area_id: string | null;
          controller_type_id: string;
          created_at: string;
          creator_id: string;
          id: string;
          label: string;
          updated_at: string;
        };
        Insert: {
          area_id?: string | null;
          controller_type_id: string;
          created_at?: string;
          creator_id: string;
          id: string;
          label: string;
          updated_at?: string;
        };
        Update: {
          area_id?: string | null;
          controller_type_id?: string;
          created_at?: string;
          creator_id?: string;
          id?: string;
          label?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'controller_area_id_fkey';
            columns: ['area_id'];
            isOneToOne: false;
            referencedRelation: 'area';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'controller_controller_type_id_fkey';
            columns: ['controller_type_id'];
            isOneToOne: false;
            referencedRelation: 'controller_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'controller_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      controller_type: {
        Row: {
          id: string;
          key: string;
          label: string;
        };
        Insert: {
          id: string;
          key: string;
          label: string;
        };
        Update: {
          id?: string;
          key?: string;
          label?: string;
        };
        Relationships: [];
      };
      data: {
        Row: {
          controller_id: string | null;
          created_at: string;
          data: Json;
          id: string;
        };
        Insert: {
          controller_id?: string | null;
          created_at?: string;
          data: Json;
          id: string;
        };
        Update: {
          controller_id?: string | null;
          created_at?: string;
          data?: Json;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'data_controller_id_fkey';
            columns: ['controller_id'];
            isOneToOne: false;
            referencedRelation: 'controller';
            referencedColumns: ['id'];
          },
        ];
      };
      device: {
        Row: {
          active: boolean;
          controller_id: string | null;
          created_at: string;
          device_type_id: string;
          id: string;
          label: string;
          updated_at: string;
          value: number | null;
        };
        Insert: {
          active?: boolean;
          controller_id?: string | null;
          created_at?: string;
          device_type_id: string;
          id: string;
          label: string;
          updated_at?: string;
          value?: number | null;
        };
        Update: {
          active?: boolean;
          controller_id?: string | null;
          created_at?: string;
          device_type_id?: string;
          id?: string;
          label?: string;
          updated_at?: string;
          value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'device_controller_id_fkey';
            columns: ['controller_id'];
            isOneToOne: false;
            referencedRelation: 'controller';
            referencedColumns: ['id'];
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
          id: string;
          key: string;
          label: string;
        };
        Insert: {
          id: string;
          key?: string;
          label: string;
        };
        Update: {
          id?: string;
          key?: string;
          label?: string;
        };
        Relationships: [];
      };
      roommate: {
        Row: {
          created_at: string;
          deleted: boolean;
          first_roommate_id: string;
          secondary_roommate_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          first_roommate_id: string;
          secondary_roommate_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          first_roommate_id?: string;
          secondary_roommate_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'roommate_first_roommate_id_fkey';
            columns: ['first_roommate_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'roommate_secondary_roommate_id_fkey';
            columns: ['secondary_roommate_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      roommate_requests: {
        Row: {
          canceled: boolean;
          created_at: string;
          receiver_id: string;
          sender_id: string;
          updated_at: string;
        };
        Insert: {
          canceled?: boolean;
          created_at?: string;
          receiver_id: string;
          sender_id: string;
          updated_at?: string;
        };
        Update: {
          canceled?: boolean;
          created_at?: string;
          receiver_id?: string;
          sender_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'roommate_requests_receiver_id_fkey';
            columns: ['receiver_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'roommate_requests_sender_id_fkey';
            columns: ['sender_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          created_at: string;
          first_name: string;
          first_surname: string;
          id: string;
          second_name: string | null;
          second_surname: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          first_name: string;
          first_surname: string;
          id: string;
          second_name?: string | null;
          second_surname?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          first_name?: string;
          first_surname?: string;
          id?: string;
          second_name?: string | null;
          second_surname?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_individual: {
        Row: {
          full_name: string | null;
          location: string | null;
          location_hash: string | null;
          user_id: string;
        };
        Insert: {
          full_name?: string | null;
          location?: string | null;
          location_hash?: string | null;
          user_id: string;
        };
        Update: {
          full_name?: string | null;
          location?: string | null;
          location_hash?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_individual_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      users_in_areas: {
        Row: {
          area_id: string;
          assigned_at: string;
          role: Database['public']['Enums']['role'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          area_id: string;
          assigned_at?: string;
          role?: Database['public']['Enums']['role'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          area_id?: string;
          assigned_at?: string;
          role?: Database['public']['Enums']['role'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_in_areas_area_id_fkey';
            columns: ['area_id'];
            isOneToOne: false;
            referencedRelation: 'area';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_in_areas_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
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
      role: 'ADMIN' | 'EDITOR' | 'VIEWER';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
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
