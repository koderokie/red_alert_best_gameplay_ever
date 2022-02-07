import { Vector } from '../../../common/vector';
import { IGameObjectData, IGameObjectContent } from './dto';
import { InteractiveList } from './interactiveList';

const interactiveList = new InteractiveList();

export class InteractiveObject{
  isHovered: boolean;
  onMouseMove: any;
  onMouseEnter: any;
  onMouseLeave: any;
  onClick: any;
  onDestroyed: () => void;
  getList: () => InteractiveList;
  id: string;
  playerId: string;
  position: Vector;
  type: string;
  primary: boolean;
  selected: boolean;
  color: string;
  subType: string;

  constructor() {
    interactiveList.add(this);
  }

  updateObject(data: IGameObjectContent) {

  }

  handleMove(tile:Vector, cursor:Vector){
    if (this.inShape(tile, cursor)){
      this.onMouseMove?.(tile);
      if (!this.isHovered) {
        this.isHovered = true;
        this.onMouseEnter?.(tile);
      }
    } else {
      if (this.isHovered) {
        this.isHovered = false;
        this.onMouseLeave?.(tile);
      }
    }  
  }

  handleClick(tile:Vector, cursor:Vector){
    if (this.inShape(tile, cursor)){
      this.onClick?.(tile, cursor);
    }
  }

 inShape(tile: Vector, cursor: Vector): boolean {
      let pos = cursor.clone().sub(new Vector(this.position.x, this.position.y));
    if (pos.abs()<15){
      return true;
    }
    return false;
  }

  render(ctx: CanvasRenderingContext2D, camera: Vector, ...props: any): void {
   
  }

  getAction(hovered:InteractiveObject, mapTile?:number) {
    return "select";
  }

  getDamage(target: InteractiveObject) {
    return 10;    
  }
  
  damage(point: Vector, tile: Vector, unit: InteractiveObject) {
    
  }
}

export { interactiveList };