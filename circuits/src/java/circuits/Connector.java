package circuits;

public class Connector {
    public String from;
    public String to;
    
    public Connector(String from, String to){
        this.from = from;
        this.to = to;
    }
    
    public String getFrom(){
        return from;
    }
    
    public String getTo(){
        return to;
    }
    
    public void setFrom(String from){
        this.from = from;
    }
    
    public void setTo(String to){
        this.to = to;
    }
}
