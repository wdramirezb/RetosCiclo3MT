package ciclo3.doctor.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Entidad o modelo que define la tabla Admin y sus relaciones con las demás
 * entidades o tablas de la "base de datos" para el proyecto: Servicios médicos
 * especializados. Esta tabla relaciona los nombres de los clientes, su correo,
 * contraseña y edad. La tabla se relaciona con las tablas de las reservas de
 * citas médicas y de los mensajes de calificación de las citas.
 */
/**
 * Define la entidad Cliente así como la tabla client en la base de datos y sus
 * relaciones con las demás tablas del esquema.
 *
 * @author William David Ramírez Blauvelt
 */
@Entity
@Table(name = "admin")
public class Admin {

    /**
     * Campo de identificador único de registros en la tabla. Define el
     * identificador único de los campos de la tabla e indica que es
     * autoincremental.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAdmin", length = 10, nullable = false, updatable = false)
    private Integer idAdmin;

    /**
     * Campo para los nombres de los usuarios administradores.
     */
    @Column(name = "name", length = 250, updatable = true)
    private String name;

    /**
     * Campo para los correos de los usuarios.
     */
    @Column(name = "email", length = 45, updatable = false)
    private String email;

    /**
     * Campo para las contraseñas de los usuarios.
     */
    @Column(name = "password", length = 45, updatable = true)
    private String password;

    public Integer getIdAdmin() {
        return idAdmin;
    }

    public void setIdAdmin(Integer idAdmin) {
        this.idAdmin = idAdmin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

}
