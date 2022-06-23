using ActorApi.Data.Entities;
using ActorApi.DTOs;
using ActorApi.DTOs.Actor;
using AutoMapper;
using System;

namespace ActorApi.AutoMapperProfiles
{
    public class ActorMapper : Profile
    {
        public ActorMapper()
        {
            CreateMap<Actor, ActorGetDto>().ReverseMap();
            CreateMap<Actor, ActorCreateDto>().ReverseMap();
            CreateMap<Actor, ActorUpdateDto>().ReverseMap();
        }
    }
}
