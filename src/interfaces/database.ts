export interface OwnArea {
  area_type?: AreaType;
  area_type_id: number;
  controller?: Controller[];
  created_at?: string;
  creator_uuid?: string;
  id: number;
  label: string;
  updated_at: string;
  uuid: string;
}

export interface AreaType {
  icon: string;
  id: number;
  label: string;
  color: string;
}

export interface Controller {
  controller_type_id: number;
  created_at: string;
  id: number;
  label: string;
  space_uuid: string;
  updated_at: string;
  uuid: string;
}
