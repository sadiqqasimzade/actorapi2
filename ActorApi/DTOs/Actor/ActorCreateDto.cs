using System.ComponentModel.DataAnnotations;

namespace ActorApi.DTOs.Actor
{
    public class ActorCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Url { get; set; }
    }
}
