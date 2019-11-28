package circuits;

public class Device {
    public String type;
    public String id;
    public String x;
    public String y;
    public String label;
    
    public Device(String id, String type, String label, String x, String y){
        this.type = type;
        this.id = id;
        this.x = x;
        this.y = y;
        this.label = label;
    }
    
    public String getType(){
        return type;
    }
    public String getId(){
        return id;
    }
    public String getX(){
        return x;
    }
    public String getY(){
        return y;
    }
    public String getLabel(){
        return label;
    }
    
    public void setType(String type){
        this.type = type;
    }
    public void setId(String id){
        this.id = id;
    }
    public void setX(String x){
        this.x = x;
    }
    public void setY(String y){
        this.y = y;
    }
    public void setLabel(String label){
        this.label = label;
    }
}
