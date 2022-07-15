using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenresDTO, Genre>().ReverseMap();
            CreateMap<GenreCreatetionDTO, Genre>();

            CreateMap<ActorDTO, Actor>().ReverseMap();
            CreateMap<ActorCreationDTO, Actor>()
                .ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<MovieTheater, MovieTheaterDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));
            CreateMap<MovieTheaterCreationDTO, MovieTheater>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<MovieCreationDTO, Movie>()
                .ForMember(x => x.Poster, option => option.Ignore())
                .ForMember(x => x.MoviesGenres, option => option.MapFrom(MapMoviesGenres))
                .ForMember(x => x.MovieTheatersMovies, option => option.MapFrom(MapMovieTheatersMovies))
                .ForMember(x => x.MoviesActors, option => option.MapFrom(MapMovieActors));

            CreateMap<Movie, MovieDTO>()
                .ForMember(x => x.Genres, options => options.MapFrom(MapMoviesGenres))
                .ForMember(x => x.MovieTheaters, options => options.MapFrom(MapMovieTheatersMovies))
                .ForMember(x => x.Actors, options => options.MapFrom(MapMoviesActors));
        }

        private List<GenreDTO> MapMoviesGenres(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<GenreDTO>();
            if(movie.MoviesGenres != null)
            {
                foreach (var genre in movie.MoviesGenres)
                {
                    result.Add(new GenreDTO()
                    {
                        Id = genre.GenreId,
                        Name = genre.Genre.Name
                    });
                }
            }
            return result;
        }

        private List<MovieTheaterDTO> MapMovieTheatersMovies(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<MovieTheaterDTO>();
            if (movie.MovieTheatersMovies != null)
            {
                foreach(var movieTheatersMovies in movie.MovieTheatersMovies)
                {
                    result.Add(new MovieTheaterDTO()
                    {
                        Id = movieTheatersMovies.MovieTheaterId,
                        Name = movieTheatersMovies.MovieTheater.Name,
                        Latitude = movieTheatersMovies.MovieTheater.Location.Y,
                        Longitude = movieTheatersMovies.MovieTheater.Location.X
                    });
                }
            }
            return result;
        }

        private List<ActorsMovieDTO> MapMoviesActors(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<ActorsMovieDTO>();
            if (movie.MoviesActors != null)
            {
                foreach(var moviesActors in movie.MoviesActors)
                {
                    result.Add(new ActorsMovieDTO()
                    {
                        Id = moviesActors.ActorId,
                        Name = moviesActors.Actor.Name,
                        Character = moviesActors.Character,
                        Picture = moviesActors.Actor.Picture,
                        Order = moviesActors.Order
                    });
                }
            }
            return result;
        }


        private List<MoviesGenres> MapMoviesGenres(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesGenres>();
            if (movieCreationDTO.GenresIds == null)
            {
                return result;
            }
            foreach (var id in movieCreationDTO.GenresIds)
            {
                result.Add(new MoviesGenres()
                {
                    GenreId = id
                });
            }
            return result;
        }
        private List<MovieTheatersMovies> MapMovieTheatersMovies(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieTheatersMovies>();
            if (movieCreationDTO.MovieTheatersIds == null)
            {
                return result;
            }
            foreach(var Id in movieCreationDTO.MovieTheatersIds)
            {
                result.Add(new MovieTheatersMovies()
                {
                    MovieTheaterId = Id
                });
            }
            return result;
        }
        private List<MoviesActors> MapMovieActors(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesActors>();
            if (movieCreationDTO.Actors == null)
            {
                return result;
            }
            foreach(var actor in movieCreationDTO.Actors)
            {
                result.Add(new MoviesActors()
                {
                    ActorId = actor.Id,
                    Character = actor.Character
                });
            }
            return result;
        }
    }
}
