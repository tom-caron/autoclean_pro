SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


DROP TABLE IF EXISTS `agences`;
CREATE TABLE IF NOT EXISTS `agences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `code_postal` varchar(10) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `url_localisation` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `agences` (`id`, `nom`, `adresse`, `ville`, `code_postal`, `telephone`, `url_localisation`) VALUES
(1, 'Agence de Rouen', '150 rue de la Cathédrale', 'Rouen', '76100', '0232123256', ''),
(2, 'Agende de Lyon', '42 route de la la Garonne', 'Lyon', '69000', '02332569878', ''),
(3, 'Agence de Marseille', '3 place de la Cannebière', 'Marseille', '13000', '0232789856', ''),
(4, 'Agence de Paris', '10 pied de la Tour Effeil', 'Paris', '70123', '0232125478', ''),
(5, 'Agence de Rennes', '6 avenue du vaillant', 'Rennes', '35000', '0232156589', ''),
(6, 'Agence de Nantes', '12 Paul Corneil', 'Nantes', '44000', '0232050708', ''),
(7, 'Agence de Bordeaux', '5 route du cinq', 'Bordeaux', '30072', '0233120362', ''),
(8, 'Agence de Monaco', '3bis epingle', 'Monaco', '98000', '0232112345', ''),
(9, 'Agence de Toulouse', '7 place du Rugby', 'Toulouse', '31000', '0232789432', ''),
(10, 'Agence de Brest', '2 rue du Paris Brest', 'Brest', '29200', '0232560127', '');

DROP TABLE IF EXISTS `agence_horaires`;
CREATE TABLE IF NOT EXISTS `agence_horaires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agence_id` int DEFAULT NULL,
  `jour_semaine` enum('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche') DEFAULT NULL,
  `heure_debut` time DEFAULT '08:00:00',
  `heure_fin` time DEFAULT '18:00:00',
  `est_ferme` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_agence_id` (`agence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `agence_horaires` (`id`, `agence_id`, `jour_semaine`, `heure_debut`, `heure_fin`, `est_ferme`) VALUES
(1, 1, 'Lundi', '08:00:00', '18:00:00', 0),
(2, 1, 'Mardi', '08:00:00', '18:00:00', 0),
(3, 1, 'Mercredi', '08:00:00', '18:00:00', 0),
(4, 1, 'Jeudi', '08:00:00', '18:00:00', 0),
(5, 1, 'Vendredi', '08:00:00', '18:00:00', 0),
(6, 1, 'Samedi', '08:00:00', '16:00:00', 0),
(7, 1, 'Dimanche', '08:00:00', '18:00:00', 1);

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `agence_id` int NOT NULL,
  `note` int NOT NULL,
  `commentaire` text,
  `date_avis` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `agence_id` (`agence_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `disponibilites_employes`;
CREATE TABLE IF NOT EXISTS `disponibilites_employes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_employe` int NOT NULL,
  `date` date NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employe` (`id_employe`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `disponibilites_employes` (`id`, `id_employe`, `date`, `heure_debut`, `heure_fin`) VALUES
(1, 1, '2025-04-11', '08:00:00', '18:00:00'),
(2, 7, '2025-04-29', '08:00:00', '18:00:00'),
(3, 7, '2025-04-30', '08:00:00', '18:00:00'),
(4, 7, '2025-05-01', '08:00:00', '18:00:00'),
(5, 7, '2025-05-02', '08:00:00', '18:00:00'),
(6, 7, '2025-05-03', '08:00:00', '18:00:00'),
(7, 7, '2025-05-04', '08:00:00', '18:00:00');

DROP TABLE IF EXISTS `employes`;
CREATE TABLE IF NOT EXISTS `employes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agence_id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `id_role` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_role` (`id_role`),
  KEY `agence_id` (`agence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `employes` (`id`, `agence_id`, `nom`, `prenom`, `email`, `mot_de_passe`, `telephone`, `id_role`) VALUES
(1, 1, 'Mecderouen', 'Allan', 'allan@gmail.com', NULL, '0607080904', 3),
(2, 1, 'Admin', 'Gaetan', 'gaetan.autoclean@gmail.com', '$2b$10$zmrglUTpNRjkbj8bLXFH3.KQCj98revJQ4DVv0znJgxu4r594ZfS6', NULL, 2),
(3, 1, 'Dumont', 'Aurélia', 'aurelia.dumont@autoclean.pro', NULL, NULL, 3),
(4, 1, 'Corre', 'Stéphanie', 'steph.corre@autoclean.pro', NULL, NULL, 3),
(5, 2, 'Golgberg', 'Joe', 'joe.oglgberg@autoclean.pro', NULL, NULL, 3),
(6, 2, 'Ronaldo', 'Christiane', 'christiane.ronaldo@autoclean.pro', NULL, NULL, 3),
(7, 3, 'DeTP', 'Jul', 'jul.detp@autoclean.pro', NULL, NULL, 3),
(8, 3, 'Autoban', 'SCH', 'scg.otto@autoclean.pro', NULL, NULL, 3),
(9, 3, 'Bobcolla', 'Zamdane', 'zamdane.bobcolla@autoclean.pro', NULL, NULL, 3),
(10, 4, 'AhhhhhLeRoro', 'Ninho', 'ni@autoclean.pro', NULL, NULL, 3),
(11, 4, 'Top7', 'Favé', 'fave.djoufara@autoclean.pro', NULL, NULL, 3),
(12, 5, 'Denas', 'Paul', 'paul.mma@autoclean.pro', NULL, NULL, 3),
(14, 5, 'Romain', 'Lebouseuh', 'bouzi@autoclean.pro', NULL, NULL, 3),
(15, 5, 'Traineau', 'Lecerf', 'lecerf@autoclean.pro', '', NULL, 3),
(16, 6, 'Leroy', 'Nolwen', 'nolwen.leroy@autoclean.pro', NULL, NULL, 3),
(17, 7, 'Levin', 'Manau', 'manau.levin@autoclean.pro', NULL, NULL, 3),
(18, 7, 'dinspi', 'Jaiplu', 'jaiplu.dinspi@autoclean.pro', NULL, NULL, 3),
(19, 8, 'Bagnole', 'GMK', 'gmk.voiture@autoclean.com', NULL, NULL, 3),
(20, 8, 'Monaco', 'Le prince', 'leprince.monaco@autoclean.pro', NULL, NULL, 3),
(21, 9, 'rugby', 'Antoine', 'antoine.rugby@autoclean.pro', NULL, NULL, 3),
(22, 10, 'la serieux', 'qui habite là', 'jenaimarre@autoclean.pro', NULL, NULL, 3);

DROP TABLE IF EXISTS `fidelite`;
CREATE TABLE IF NOT EXISTS `fidelite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `points` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `options_supplementaires`;
CREATE TABLE IF NOT EXISTS `options_supplementaires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `options_supplementaires` (`id`, `libelle`, `prix`) VALUES
(1, 'Cirage', '20.00'),
(2, 'Nettoyage moteur', '30.00'),
(3, 'Désinfection', '15.00');

DROP TABLE IF EXISTS `rendez_vous`;
CREATE TABLE IF NOT EXISTS `rendez_vous` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `agence_id` int NOT NULL,
  `vehicule_id` int NOT NULL,
  `type_nettoyage_id` int NOT NULL,
  `employe_id` int DEFAULT NULL,
  `date_heure` datetime NOT NULL,
  `statut` enum('en attente','validé','annulé','terminé') DEFAULT 'en attente',
  `prix_total` float NOT NULL,
  `paiement_effectue` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_nettoyage_id` (`type_nettoyage_id`),
  KEY `employe_id` (`employe_id`),
  KEY `vehicule_id` (`vehicule_id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `agence_id` (`agence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `rendez_vous` (`id`, `utilisateur_id`, `agence_id`, `vehicule_id`, `type_nettoyage_id`, `employe_id`, `date_heure`, `statut`, `prix_total`, `paiement_effectue`) VALUES
(40, 1, 1, 1, 2, 1, '2025-04-11 12:00:00', 'en attente', 75, NULL),
(41, 1, 1, 1, 3, 1, '2025-04-11 12:30:00', 'en attente', 185, NULL),
(43, 1, 3, 1, 1, 7, '2025-04-30 13:00:00', 'en attente', 70, NULL),
(44, 1, 3, 1, 2, 7, '2025-04-30 12:00:00', 'en attente', 75, NULL);

DROP TABLE IF EXISTS `rendez_vous_options`;
CREATE TABLE IF NOT EXISTS `rendez_vous_options` (
  `rendez_vous_id` int NOT NULL,
  `option_id` int NOT NULL,
  PRIMARY KEY (`rendez_vous_id`,`option_id`),
  KEY `option_id` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `rendez_vous_options` (`rendez_vous_id`, `option_id`) VALUES
(41, 1),
(43, 1),
(41, 2),
(41, 3);

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `roles` (`id`, `nom`) VALUES
(1, 'super_admin'),
(2, 'admin'),
(3, 'employe');

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE IF NOT EXISTS `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agence_id` int NOT NULL,
  `produit` varchar(100) NOT NULL,
  `quantite` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `agence_id` (`agence_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `types_nettoyage`;
CREATE TABLE IF NOT EXISTS `types_nettoyage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) NOT NULL,
  `description` text,
  `prix_base` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `types_nettoyage` (`id`, `libelle`, `description`, `prix_base`) VALUES
(1, 'intérieur', 'aspirateur + nettoyage intérieur du véhicule', '50.00'),
(2, 'extérieur', 'lavage + rincage + polish de la carroserie du véhicule', '75.00'),
(3, 'intérieur / extérieur', 'Lavage intégrale du véhicule intérieur + extérieur', '120.00');

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `adresse` text,
  `agence_favorie_id` int DEFAULT NULL,
  `photo_profil` varchar(255) DEFAULT NULL,
  `langue_preferee` varchar(2) NOT NULL DEFAULT 'FR',
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `agence_favorie_id` (`agence_favorie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `telephone`, `adresse`, `agence_favorie_id`, `photo_profil`, `langue_preferee`, `createdAt`, `updatedAt`) VALUES
(1, 'Caron', 'Tom', 'caron.tom1@gmail.com', '$2b$10$zmrglUTpNRjkbj8bLXFH3.KQCj98revJQ4DVv0znJgxu4r594ZfS6', '0621202683', '2075 route de Lisieux', 2, NULL, 'FR', '2025-04-10 09:38:26', '2025-04-29 07:11:02'),
(2, 'Davitti', 'Nahim', 'nahim@gmail.com', '', '0604050604', '53 route de la ville', NULL, NULL, 'FR', '2025-04-10 10:01:18', '2025-04-10 10:01:18'),
(4, 'Test', 'Monsieur', 'test@test.com', '', NULL, NULL, NULL, NULL, 'FR', '2025-04-11 14:40:40', '2025-04-11 14:40:40');

DROP TABLE IF EXISTS `vehicules`;
CREATE TABLE IF NOT EXISTS `vehicules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `marque` varchar(100) NOT NULL,
  `modele` varchar(100) NOT NULL,
  `immatriculation` varchar(20) NOT NULL,
  `type_vehicule` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `vehicules` (`id`, `utilisateur_id`, `marque`, `modele`, `immatriculation`, `type_vehicule`) VALUES
(1, 1, 'Mercedes', 'Classe A', 'SR-917-DS', 'Citadine');


ALTER TABLE `agence_horaires`
  ADD CONSTRAINT `fk_agence_id` FOREIGN KEY (`agence_id`) REFERENCES `agences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `disponibilites_employes`
  ADD CONSTRAINT `fk_employe` FOREIGN KEY (`id_employe`) REFERENCES `employes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `employes`
  ADD CONSTRAINT `employes_ibfk_1` FOREIGN KEY (`agence_id`) REFERENCES `agences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `fidelite`
  ADD CONSTRAINT `fidelite_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `rendez_vous`
  ADD CONSTRAINT `rendez_vous_ibfk_1` FOREIGN KEY (`type_nettoyage_id`) REFERENCES `types_nettoyage` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendez_vous_ibfk_2` FOREIGN KEY (`employe_id`) REFERENCES `employes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendez_vous_ibfk_3` FOREIGN KEY (`vehicule_id`) REFERENCES `vehicules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendez_vous_ibfk_4` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendez_vous_ibfk_5` FOREIGN KEY (`agence_id`) REFERENCES `agences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `rendez_vous_options`
  ADD CONSTRAINT `rendez_vous_options_ibfk_1` FOREIGN KEY (`rendez_vous_id`) REFERENCES `rendez_vous` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendez_vous_options_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `options_supplementaires` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`agence_id`) REFERENCES `agences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`agence_favorie_id`) REFERENCES `agences` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

ALTER TABLE `vehicules`
  ADD CONSTRAINT `vehicules_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
