package ciclo3.doctor.entidades;
/**
 * Entidad o modelo que define la tabla Message y sus relaciones con las demás
 * entidades o tablas de la "base de datos" para el proyecto: 
 * Servicios médicos especializados.
 * Esta tabla relaciona los mensajes sobre las reservas.
 * La tabla se relaciona con las tablas doctor y cliente.
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Define la entidad Mensaje así como la tabla message en la base de datos y sus 
 * relaciones con las demás tablas del esquema.
 * @author William David Ramírez Blauvelt
 */
@Entity
@Table(name = "message")
public class Mensaje implements Serializable {
    
    /**
     * Campo de identificador único de registros en la tabla.
     * Define el identificador único de los campos de la tabla e indica que es
     * autoincremental.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMessage", length = 10, updatable = false)
    private Integer idMessage;
    
    /**
     * Campo para los mensajes.
     */
    @Column(name = "messageText", length = 250, updatable = true)
    private String messageText;

    /**
     * Establece relación muchos a uno con el listado de doctores.
     * Muchos mensajes pueden ser escritos sobre el mismo doctor.
     */
    @ManyToOne
    @JoinColumn(name = "id")
    @JsonIgnoreProperties({"messages", "client", "reservations"})
    private Doctor doctor;

    /**
     * Establece relación muchos a uno con el listado de clientes.
     * Muchos mensajes pueden ser escritos por el mismo cliente.
     */
    @ManyToOne
    @JoinColumn(name = "clientId")
    @JsonIgnoreProperties({"messages", "reservations", "client"})
    private Cliente client;

    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }

}
