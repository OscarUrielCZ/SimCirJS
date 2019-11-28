package circuits;

import java.util.ArrayList;

public class Circuito {
    String id;
    String username;
    String name;
    ArrayList<Device> devices = new ArrayList<>();
    ArrayList<Connector> conectores = new ArrayList<>();
    
    public Circuito(){
        
    }
    
    public Circuito(String id, String user, String n){
        this.id = id;
        username = user;
        name = n; 
    }
    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
    }
    public void setUser(String user){
        this.username = user;
    }
    public void setName(String name){
        this.name = name;
    }
  
}
