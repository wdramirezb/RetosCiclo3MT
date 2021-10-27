package ciclo3.doctor.entidades;
/**
 * Entidad o modelo que define la tabla Client y sus relaciones con las demás
 * entidades o tablas de la "base de datos" para el proyecto: 
 * Servicios médicos especializados.
 * Esta tabla relaciona los nombres de los clientes, su correo, contraseña y edad.
 * La tabla se relaciona con las tablas de las reservas de citas médicas y de los 
 * mensajes de calificación de las citas.
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Define la entidad Cliente así como la tabla client en la base de datos y sus 
 * relaciones con las demás tablas del esquema.
 * @author William David Ramírez Blauvelt
 */
@Entity
@Table(name = "client")
public class Cliente implements Serializable {

    /**
     * Campo de identificador único de registros en la tabla.
     * Define el identificador único de los campos de la tabla e indica que es
     * autoincremental.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idClient", length = 10, nullable = false, updatable = false)
    private Integer idClient;
    
    /**
     * Campo para los correos de los clientes.
     */
    @Column(name = "email", length = 45, updatable = false)
    private String email;
    
    /**
     * Campo para las contraseñas de los clientes.
     */
    @Column(name = "password", length = 45, updatable = true)
    private String password;
    
    /**
     * Campo para los nombres de los clientes.
     */
    @Column(name = "name", length = 250, updatable = true)
    private String name;
    
    /**
     * Campo para la edad de los clientes.
     */
    @Column(name = "age", length = 3, updatable = true)
    private Integer age;

    /**
     * Establece relación uno a muchos con el listado de mensajes.
     * Un cliente puede tener muchos mensajes.
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    @JsonIgnoreProperties("client")
    public List<Mensaje> messages;

    /**
     * Establece relación uno a muchos con el listado de reservas.
     * Un cliente puede tener muchos reservas.
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    @JsonIgnoreProperties("client")
    public List<Reservaciones> reservations;

    public Integer getIdClient() {
        return idClient;
    }

    public void setIdClient(Integer idClient) {
        this.idClient = idClient;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public List<Mensaje> getMessages() {
        return messages;
    }

    public void setMessages(List<Mensaje> messages) {
        this.messages = messages;
    }

    public List<Reservaciones> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservaciones> reservations) {
        this.reservations = reservations;
    }

}
