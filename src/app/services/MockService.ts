import {User} from "../models/user";
import {paymentMethod} from "../models/Constant";
import {Note} from "../models/note";
import {Schedule} from "../models/Schedule";
import {Appointement} from "../models/appointement";
import {HealthRecord} from "../models/healthRecord";
import {Vaccin} from "../models/vaccin";

export class MockService{

  static mockUser(): User{
    return new User(
      "client",
      new Date(),
      "test@mail.fr",
      "djadji",
      "traore",
      "0750367067",
      "homme",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static mockVet() : User{
    return new User(
      "veterinary",
      new Date(1997, 1,1997),
      "testVet@mail.fr",
      "vet",
      "inary",
      "0750367067",
      "undefined",
      "male",
      "Médecine interne des animaux de compagnie",
      [
        "Consultation",
        "Chirurgie",
        "Consultation suivi",
        "Stérilisation"
      ],
      [
        paymentMethod[0],
        paymentMethod[1]
      ],
      new Note("Sonnez chez Mr. Berger pour rentrer.", new Date(2021, 6, 21)),
      "Hopital salpeChienaitre",
      "12 rue de la paix",
      "75002",
      "Paris",
      "France",
      12345657,
      new Schedule(
        7,12 , 14,18,
        [
          true,
          true,
          true,
          true,
          true,
          false,
          false,
        ]
      ),
      true,
    )
  }

  static mockVetNotActive() : User{
    return new User(
      "veterinary",
      new Date(1997, 1,1997),
      "testVet@mail.fr",
      "vet not",
      "inary active",
      "0750367067",
      "undefined",
      "male",
      "Médecine générale des animaux de compagnie",
      [
        "Consultation",
        "Chirurgie",
        "Consultation suivi",
        "Stérilisation"
      ],
      [
        paymentMethod[0],
        paymentMethod[1]
      ],
      new Note("Sonnez chez Mr. Berger pour rentrer.", new Date(2021, 6, 21)),
      "123 soleil",
      "12 rue de la paix",
      "75002",
      "Paris",
      "France",
      12345657,
      new Schedule(
        7,12 , 14,18,
        [
          true,
          false,
          true,
          false,
          true,
          false,
          false,
        ]
      ),
      false,
    )
  }

  static mockAppointment(): Appointement{
    return new Appointement(
      new Date(),
      this.mockUser(),
      this.mockVet(),
      "Consultation",
      new Date(2022, 9, 3),
      this.mockHealRecord(),
      45
    )
  }

  static mockAppointment2(): Appointement{
    return new Appointement(
      new Date(2023,1,10),
      this.mockUser(),
      this.mockVet(),
      "Chirurgie",
      new Date(2022, 9, 3),
      this.mockHealRecord(),
      45
    )
  }

  static mockAppointmentOld(): Appointement{
    return new Appointement(
      new Date(2021,1,10),
      this.mockUser(),
      this.mockVet(),
      "Consultation dermatologique",
      new Date(2021, 1, 3),
      this.mockHealRecord(),
      45
    )
  }

  static mockHealRecord(): HealthRecord{
    return new HealthRecord(
      "Chien",
      "Douou",
      "Staffie",
      "Mâle",
      true, new Date(2020, 3, 12),
      0,
      [
        this.mockVaccin(),
        this.mockVaccin(),
        this.mockVaccin()
      ],
      [
        this.mockNote(),
        this.mockNote(),
        this.mockNote(),
      ]
    )
  }

  static mockVaccin(): Vaccin{
    return new Vaccin("Maladie de Carré",
      new Date(2020, 9, 12),
      new Date(2022, 9, 12))
  }

  static mockNote(): Note{
    return new Note("Doit prendre un bain tout les soirs jusqu'au 22/12/2022",
      new Date(2022, 3, 12))
  }
}
