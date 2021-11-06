package ciclo3.doctor.repositorios;

import ciclo3.doctor.entidades.Score;
import ciclo3.doctor.interfaces.InterfaceScore;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositorioScore {

    @Autowired
    private InterfaceScore crud;

    public List<Score> getAll() {
        return (List<Score>) crud.findAll();
    }

    public Optional<Score> getScore(int id) {
        return crud.findById(id);
    }

    public Score save(Score score) {
        return crud.save(score);
    }

    ///RETO 4
    public void delete(Score score) {
        crud.delete(score);
    }

}
